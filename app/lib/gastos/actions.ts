'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { formaPago } from '../data-sets';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  fecha: z.string().nullable(),
  proveedorId: z.string({
    invalid_type_error: 'Selecciona un proveedor',
  }),
  numero: z.string().nullable(),
  importe: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  formaPago: z.string(),
  tipoGasto: z.string(),
  formato: z.string(),
  vencimiento: z.string().nullable(),
  estado: z.enum(['Pendiente', 'Pagado'], {
    invalid_type_error: 'Please select an invoice status.'})
});

const CrearGasto = FormSchema.omit({ id: true, created_at: true });

export type State = {
  errors?: {
    fecha?: string[];
    proveedorId?: string[];
    numero?: string[];
    importe?: string[];
    formaPago?: string[];
    tipoGasto?: string[];
    formato?: string[];
    vencimiento?: string[];
    estado?: string[];
  };
  message?: string | null;
};

export async function crearGasto(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CrearGasto.safeParse({
    fecha: formData.get('fecha') || null,
    proveedorId: formData.get('proveedorId'),
    numero: formData.get('numero'),
    importe: formData.get('importe'),
    formaPago: formData.get('formaPago'),
    tipoGasto: formData.get('tipoGasto'),
    formato: formData.get('formato'),
    vencimiento: formData.get('vencimiento') || null,
    estado: formData.get('estado'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log('Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Gasto.',
    };
  }

  // Prepare data for insertion into the database
  const { fecha, proveedorId, numero, importe, formaPago, tipoGasto, formato, vencimiento, estado } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO gastos (fecha, proveedor_id, numero, importe, forma_pago, tipo_gasto, formato, vencimiento, estado)
      VALUES (${fecha}, ${proveedorId}, ${numero}, ${importe}, ${formaPago}, ${tipoGasto}, ${formato}, ${vencimiento}, ${estado})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Gasto.',
    };
  }

  // Revalidate the cache for the gastos page and redirect the user.
  revalidatePath('/dashboard/gastos');
  redirect('/dashboard/gastos');
}

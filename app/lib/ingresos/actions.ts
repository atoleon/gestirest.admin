'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  fecha: z.string().nullable(),
  efectivo: z.coerce.number().min(0, { message: 'El importe no puede ser negativo.' }),
  tarjeta: z.coerce.number().min(0, { message: 'El importe no puede ser negativo.' }),
  tipoIngreso: z.string({ invalid_type_error: 'Selecciona un tipo de ingreso.' }),
});

const CrearIngreso = FormSchema.omit({ id: true, created_at: true });
const ActualizarIngreso = FormSchema.omit({ id: true, created_at: true });

export type State = {
  errors?: {
    fecha?: string[];
    efectivo?: string[];
    tarjeta?: string[];
    tipoIngreso?: string[];
  };
  message?: string | null;
};

export async function crearIngreso(prevState: State, formData: FormData) {
  const validatedFields = CrearIngreso.safeParse({
    fecha: formData.get('fecha') || null,
    efectivo: formData.get('efectivo'),
    tarjeta: formData.get('tarjeta'),
    tipoIngreso: formData.get('tipoIngreso'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos incorrectos. No se pudo crear el ingreso.',
    };
  }

  const { fecha, efectivo, tarjeta, tipoIngreso } = validatedFields.data;
  const total = efectivo + tarjeta;

  try {
    await sql`
      INSERT INTO ingresos (fecha, efectivo, tarjeta, total, tipo_ingreso)
      VALUES (${fecha}, ${efectivo}, ${tarjeta}, ${total}, ${tipoIngreso})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Error de base de datos: no se pudo crear el ingreso.' };
  }

  revalidatePath('/dashboard/ingresos');
  redirect('/dashboard/ingresos');
}

export async function actualizarIngreso(id: string, _prevState: State, formData: FormData) {
  const validatedFields = ActualizarIngreso.safeParse({
    fecha: formData.get('fecha') || null,
    efectivo: formData.get('efectivo'),
    tarjeta: formData.get('tarjeta'),
    tipoIngreso: formData.get('tipoIngreso'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos incorrectos. No se pudo actualizar el ingreso.',
    };
  }

  const { fecha, efectivo, tarjeta, tipoIngreso } = validatedFields.data;
  const total = efectivo + tarjeta;

  try {
    await sql`
      UPDATE ingresos
      SET fecha = ${fecha}, efectivo = ${efectivo}, tarjeta = ${tarjeta},
          total = ${total}, tipo_ingreso = ${tipoIngreso}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Error de base de datos: no se pudo actualizar el ingreso.' };
  }

  revalidatePath('/dashboard/ingresos');
  redirect('/dashboard/ingresos');
}

export async function borrarIngreso(id: string): Promise<void> {
  try {
    await sql`DELETE FROM ingresos WHERE id = ${id}`;
    revalidatePath('/dashboard/ingresos');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to Delete Ingreso.');
  }
}

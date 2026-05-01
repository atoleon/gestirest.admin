'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  nombre: z.string().min(1, { message: 'El nombre es obligatorio.' }),
  razonSocial: z.string().nullable(),
  cif: z.string().nullable(),
  direccion1: z.string().nullable(),
  direccion2: z.string().nullable(),
  codigoPostal: z.string().nullable(),
  ciudad: z.string().nullable(),
  provincia: z.string().nullable(),
});

const CrearProveedor = FormSchema.omit({ id: true, created_at: true });
const ActualizarProveedor = FormSchema.omit({ id: true, created_at: true });

export type State = {
  errors?: {
    nombre?: string[];
    razonSocial?: string[];
    cif?: string[];
    direccion1?: string[];
    direccion2?: string[];
    codigoPostal?: string[];
    ciudad?: string[];
    provincia?: string[];
  };
  message?: string | null;
};

export async function crearProveedor(prevState: State, formData: FormData) {
  const validatedFields = CrearProveedor.safeParse({
    nombre: formData.get('nombre'),
    razonSocial: formData.get('razonSocial') || null,
    cif: formData.get('cif') || null,
    direccion1: formData.get('direccion1') || null,
    direccion2: formData.get('direccion2') || null,
    codigoPostal: formData.get('codigoPostal') || null,
    ciudad: formData.get('ciudad') || null,
    provincia: formData.get('provincia') || null,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos incorrectos. No se pudo crear el proveedor.',
    };
  }

  const { nombre, razonSocial, cif, direccion1, direccion2, codigoPostal, ciudad, provincia } = validatedFields.data;

  try {
    await sql`
      INSERT INTO proveedores (nombre, razon_social, cif, direccion1, direccion2, codigo_postal, ciudad, provincia)
      VALUES (${nombre}, ${razonSocial}, ${cif}, ${direccion1}, ${direccion2}, ${codigoPostal}, ${ciudad}, ${provincia})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Error de base de datos: no se pudo crear el proveedor.' };
  }

  revalidatePath('/dashboard/proveedores');
  redirect('/dashboard/proveedores');
}

export async function actualizarProveedor(id: string, _prevState: State, formData: FormData) {
  const validatedFields = ActualizarProveedor.safeParse({
    nombre: formData.get('nombre'),
    razonSocial: formData.get('razonSocial') || null,
    cif: formData.get('cif') || null,
    direccion1: formData.get('direccion1') || null,
    direccion2: formData.get('direccion2') || null,
    codigoPostal: formData.get('codigoPostal') || null,
    ciudad: formData.get('ciudad') || null,
    provincia: formData.get('provincia') || null,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos incorrectos. No se pudo actualizar el proveedor.',
    };
  }

  const { nombre, razonSocial, cif, direccion1, direccion2, codigoPostal, ciudad, provincia } = validatedFields.data;

  try {
    await sql`
      UPDATE proveedores
      SET nombre = ${nombre}, razon_social = ${razonSocial}, cif = ${cif},
          direccion1 = ${direccion1}, direccion2 = ${direccion2},
          codigo_postal = ${codigoPostal}, ciudad = ${ciudad}, provincia = ${provincia}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Error de base de datos: no se pudo actualizar el proveedor.' };
  }

  revalidatePath('/dashboard/proveedores');
  redirect('/dashboard/proveedores');
}

export async function borrarProveedor(id: string): Promise<void> {
  try {
    await sql`DELETE FROM proveedores WHERE id = ${id}`;
    revalidatePath('/dashboard/proveedores');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to Delete Proveedor.');
  }
}

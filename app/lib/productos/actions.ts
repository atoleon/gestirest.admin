'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  proveedorId: z.string({ invalid_type_error: 'Selecciona un proveedor.' }),
  fecha: z.string().min(1, { message: 'La fecha es obligatoria.' }),
  descripcion: z.string().min(1, { message: 'La descripción es obligatoria.' }),
  unidades: z.coerce.number().nullable(),
  kg: z.coerce.number().nullable(),
  precio: z.coerce.number().gt(0, { message: 'El precio debe ser mayor que 0.' }),
  descuento: z.coerce.number().nullable(),
  Igic: z.coerce.number().min(0, { message: 'El IGIC no puede ser negativo.' }),
  etiquetas: z.string().nullable(),
});

const CrearProducto = FormSchema.omit({ id: true, created_at: true });
const ActualizarProducto = FormSchema.omit({ id: true, created_at: true });

export type State = {
  errors?: {
    proveedorId?: string[];
    fecha?: string[];
    descripcion?: string[];
    unidades?: string[];
    kg?: string[];
    precio?: string[];
    descuento?: string[];
    Igic?: string[];
    etiquetas?: string[];
  };
  message?: string | null;
};

export async function crearProducto(prevState: State, formData: FormData) {
  const validatedFields = CrearProducto.safeParse({
    proveedorId: formData.get('proveedorId'),
    fecha: formData.get('fecha'),
    descripcion: formData.get('descripcion'),
    unidades: formData.get('unidades') || null,
    kg: formData.get('kg') || null,
    precio: formData.get('precio'),
    descuento: formData.get('descuento') || null,
    Igic: formData.get('Igic') || 0,
    etiquetas: formData.get('etiquetas') || null,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos incorrectos. No se pudo crear el producto.',
    };
  }

  const { proveedorId, fecha, descripcion, unidades, kg, precio, descuento, Igic, etiquetas } = validatedFields.data;

  try {
    await sql`
      INSERT INTO productos (proveedor_id, fecha, descripcion, unidades, kg, precio, descuento, "Igic", etiquetas)
      VALUES (${proveedorId}, ${fecha}, ${descripcion}, ${unidades}, ${kg}, ${precio}, ${descuento}, ${Igic}, ${etiquetas})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Error de base de datos: no se pudo crear el producto.' };
  }

  revalidatePath('/dashboard/productos');
  redirect('/dashboard/productos');
}

export async function actualizarProducto(id: string, _prevState: State, formData: FormData) {
  const validatedFields = ActualizarProducto.safeParse({
    proveedorId: formData.get('proveedorId'),
    fecha: formData.get('fecha'),
    descripcion: formData.get('descripcion'),
    unidades: formData.get('unidades') || null,
    kg: formData.get('kg') || null,
    precio: formData.get('precio'),
    descuento: formData.get('descuento') || null,
    Igic: formData.get('Igic') || 0,
    etiquetas: formData.get('etiquetas') || null,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos incorrectos. No se pudo actualizar el producto.',
    };
  }

  const { proveedorId, fecha, descripcion, unidades, kg, precio, descuento, Igic, etiquetas } = validatedFields.data;

  try {
    await sql`
      UPDATE productos
      SET proveedor_id = ${proveedorId}, fecha = ${fecha}, descripcion = ${descripcion},
          unidades = ${unidades}, kg = ${kg}, precio = ${precio}, descuento = ${descuento},
          "Igic" = ${Igic}, etiquetas = ${etiquetas}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Error de base de datos: no se pudo actualizar el producto.' };
  }

  revalidatePath('/dashboard/productos');
  redirect('/dashboard/productos');
}

export async function borrarProducto(id: string): Promise<void> {
  try {
    await sql`DELETE FROM productos WHERE id = ${id}`;
    revalidatePath('/dashboard/productos');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to Delete Producto.');
  }
}

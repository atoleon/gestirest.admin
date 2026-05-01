import postgres from 'postgres';
import { ProveedoresTabla, ProveedorFormData } from '../definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 10;

export async function fetchFilteredProveedores(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const proveedores = await sql<ProveedoresTabla[]>`
      SELECT
        id,
        nombre,
        razon_social,
        cif,
        ciudad,
        provincia
      FROM proveedores
      WHERE
        nombre ILIKE ${`%${query}%`} OR
        razon_social ILIKE ${`%${query}%`} OR
        cif ILIKE ${`%${query}%`} OR
        ciudad ILIKE ${`%${query}%`}
      ORDER BY nombre ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return proveedores;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch proveedores.');
  }
}

export async function fetchProveedoresPaginas(query: string) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM proveedores
      WHERE
        nombre ILIKE ${`%${query}%`} OR
        razon_social ILIKE ${`%${query}%`} OR
        cif ILIKE ${`%${query}%`} OR
        ciudad ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of proveedores.');
  }
}

export async function fetchProveedorById(id: string) {
  try {
    const data = await sql<ProveedorFormData[]>`
      SELECT
        id,
        nombre,
        razon_social,
        cif,
        direccion1,
        direccion2,
        codigo_postal,
        ciudad,
        provincia
      FROM proveedores
      WHERE id = ${id}
    `;

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch proveedor.');
  }
}

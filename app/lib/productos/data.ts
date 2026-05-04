import postgres from 'postgres';
import { ProductosTabla, ProductoForm, ProveedorField } from '../definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 10;

export async function fetchFilteredProductos(
  query: string,
  currentPage: number,
  from: string,
  to: string,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const fromFilter = from ? sql`AND productos.fecha >= ${from}::date` : sql``;
  const toFilter = to ? sql`AND productos.fecha <= ${to}::date` : sql``;

  try {
    const productos = await sql<ProductosTabla[]>`
      SELECT
        productos.id,
        productos.fecha,
        proveedores.nombre AS proveedor_nombre,
        productos.descripcion,
        productos.unidades,
        productos.kg,
        productos.precio,
        productos.descuento,
        productos."Igic",
        productos.etiquetas
      FROM productos
      JOIN proveedores ON productos.proveedor_id = proveedores.id
      WHERE
        (
          productos.descripcion ILIKE ${`%${query}%`} OR
          proveedores.nombre ILIKE ${`%${query}%`} OR
          productos.etiquetas ILIKE ${`%${query}%`} OR
          productos.fecha::text ILIKE ${`%${query}%`}
        )
        ${fromFilter}
        ${toFilter}
      ORDER BY productos.fecha DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return productos;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch productos.');
  }
}

export async function fetchProductosPaginas(query: string, from: string, to: string) {
  const fromFilter = from ? sql`AND productos.fecha >= ${from}::date` : sql``;
  const toFilter = to ? sql`AND productos.fecha <= ${to}::date` : sql``;

  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM productos
      JOIN proveedores ON productos.proveedor_id = proveedores.id
      WHERE
        (
          productos.descripcion ILIKE ${`%${query}%`} OR
          proveedores.nombre ILIKE ${`%${query}%`} OR
          productos.etiquetas ILIKE ${`%${query}%`} OR
          productos.fecha::text ILIKE ${`%${query}%`}
        )
        ${fromFilter}
        ${toFilter}
    `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of productos.');
  }
}

export async function fetchProductoById(id: string) {
  try {
    const data = await sql<ProductoForm[]>`
      SELECT
        productos.id,
        productos.proveedor_id,
        productos.fecha,
        productos.descripcion,
        productos.unidades,
        productos.kg,
        productos.precio,
        productos.descuento,
        productos."Igic",
        productos.etiquetas
      FROM productos
      WHERE productos.id = ${id}
    `;

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch producto.');
  }
}

export async function fetchProveedoresParaProductos() {
  try {
    const proveedores = await sql<ProveedorField[]>`
      SELECT id, nombre
      FROM proveedores
      ORDER BY nombre ASC
    `;

    return proveedores;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch proveedores.');
  }
}

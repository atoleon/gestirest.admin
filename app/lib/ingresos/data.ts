import postgres from 'postgres';
import { IngresosTabla, IngresoForm } from '../definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 50;

export async function fetchFilteredIngresos(
  query: string,
  currentPage: number,
  from: string,
  to: string,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const fromFilter = from ? sql`AND ingresos.fecha >= ${from}::date` : sql``;
  const toFilter = to ? sql`AND ingresos.fecha <= ${to}::date` : sql``;

  try {
    const ingresos = await sql<IngresosTabla[]>`
      SELECT
        ingresos.id,
        ingresos.fecha,
        ingresos.efectivo,
        ingresos.tarjeta,
        ingresos.total,
        ingresos.tipo_ingreso
      FROM ingresos
      WHERE
        (
          ingresos.tipo_ingreso ILIKE ${`%${query}%`} OR
          ingresos.total::text ILIKE ${`%${query}%`} OR
          ingresos.fecha::text ILIKE ${`%${query}%`}
        )
        ${fromFilter}
        ${toFilter}
      ORDER BY ingresos.fecha DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return ingresos;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ingresos.');
  }
}

export async function fetchIngresosPaginas(query: string, from: string, to: string) {
  const fromFilter = from ? sql`AND ingresos.fecha >= ${from}::date` : sql``;
  const toFilter = to ? sql`AND ingresos.fecha <= ${to}::date` : sql``;

  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM ingresos
      WHERE
        (
          ingresos.tipo_ingreso ILIKE ${`%${query}%`} OR
          ingresos.total::text ILIKE ${`%${query}%`} OR
          ingresos.fecha::text ILIKE ${`%${query}%`}
        )
        ${fromFilter}
        ${toFilter}
    `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of ingresos.');
  }
}

export async function fetchIngresoById(id: string) {
  try {
    const data = await sql<IngresoForm[]>`
      SELECT
        ingresos.id,
        ingresos.fecha,
        ingresos.efectivo,
        ingresos.tarjeta,
        ingresos.tipo_ingreso
      FROM ingresos
      WHERE ingresos.id = ${id}
    `;

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ingreso.');
  }
}

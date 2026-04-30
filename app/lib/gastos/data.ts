import postgres from 'postgres';
import {
  CustomersTableType,
  InvoiceForm,
  LatestInvoiceRaw,
  Revenue,
  ProveedorField,
  GastosTabla
} from '../definitions';
import { formatCurrency } from '../utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].count ?? '0');
    const numberOfCustomers = Number(data[1].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredGastos(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const gastos = await sql<GastosTabla[]>`
      SELECT
        gastos.id,
        gastos.fecha,
        gastos.numero,
        gastos.importe,
        gastos.forma_pago,
        gastos.tipo_gasto,
        gastos.formato,
        gastos.vencimiento,
        gastos.estado,
        proveedores.nombre AS proveedor_nombre
      FROM gastos
      JOIN proveedores ON gastos.proveedor_id = proveedores.id
      WHERE
        proveedores.nombre ILIKE ${`%${query}%`} OR
        gastos.numero ILIKE ${`%${query}%`} OR
        gastos.importe::text ILIKE ${`%${query}%`} OR
        gastos.fecha::text ILIKE ${`%${query}%`} OR
        gastos.estado ILIKE ${`%${query}%`}
      ORDER BY gastos.fecha DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return gastos;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch gastos .');
  }
}

export async function fetchGastosPaginas(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM gastos
    JOIN proveedores ON gastos.proveedor_id = proveedores.id
    WHERE
      proveedores.nombre ILIKE ${`%${query}%`} OR
      gastos.numero ILIKE ${`%${query}%`} OR
      gastos.importe::text ILIKE ${`%${query}%`} OR
      gastos.fecha::text ILIKE ${`%${query}%`} OR
      gastos.estado ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of gastos.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchProveedores() {
  try {
    const proveedores = await sql<ProveedorField[]>`
      SELECT
        id,
        nombre
      FROM proveedores
      ORDER BY nombre ASC
    `;

    return proveedores;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all proveedores.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType[]>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

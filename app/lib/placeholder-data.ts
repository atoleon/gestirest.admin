// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const proveedores = [
  { id: 1, nombre: 'Distribuidora Alimentaria García' },
  { id: 2, nombre: 'Bebidas y Refrescos SA' },
  { id: 3, nombre: 'Servicios de Limpieza López' },
  { id: 4, nombre: 'Gas y Suministros Norte' },
  { id: 5, nombre: 'Equipamientos Hostelería' },
];

const gastos = [
  { fecha: '2026-01-05', proveedor_id: 1, numero: 'FAC-2026-001', importe: 1250.00, forma_pago: 'Transferencia', tipo_gasto: 'Comida', formato: 'Digital', vencimiento: '2026-01-20', estado: 'Pagado' },
  { fecha: '2026-01-08', proveedor_id: 2, numero: 'FAC-2026-002', importe: 430.50, forma_pago: 'Domiciliado', tipo_gasto: 'Bebida', formato: 'Digital', vencimiento: null, estado: 'Pagado' },
  { fecha: '2026-01-10', proveedor_id: 3, numero: 'TKT-0045', importe: 180.00, forma_pago: 'Efectivo', tipo_gasto: 'Servicio', formato: 'Ticket', vencimiento: null, estado: 'Pagado' },
  { fecha: '2026-01-15', proveedor_id: 4, numero: 'REC-0112', importe: 320.75, forma_pago: 'Domiciliado', tipo_gasto: 'Servicio', formato: 'Recibo', vencimiento: '2026-02-15', estado: 'Pagado' },
  { fecha: '2026-01-20', proveedor_id: 1, numero: 'FAC-2026-008', importe: 980.00, forma_pago: 'Transferencia', tipo_gasto: 'Comida', formato: 'Digital', vencimiento: '2026-02-05', estado: 'Pagado' },
  { fecha: '2026-02-03', proveedor_id: 5, numero: 'FAC-2026-011', importe: 2100.00, forma_pago: 'Pagaré', tipo_gasto: 'Mantenimiento', formato: 'Papel', vencimiento: '2026-05-03', estado: 'Pendiente' },
  { fecha: '2026-02-07', proveedor_id: 2, numero: 'FAC-2026-015', importe: 560.25, forma_pago: 'Domiciliado', tipo_gasto: 'Bebida', formato: 'Digital', vencimiento: null, estado: 'Pagado' },
  { fecha: '2026-02-10', proveedor_id: 1, numero: 'FAC-2026-018', importe: 1430.00, forma_pago: 'Transferencia', tipo_gasto: 'Comida', formato: 'Digital', vencimiento: '2026-02-25', estado: 'Pagado' },
  { fecha: '2026-02-14', proveedor_id: 3, numero: 'TKT-0067', importe: 210.00, forma_pago: 'Efectivo', tipo_gasto: 'Consumible', formato: 'Ticket', vencimiento: null, estado: 'Pagado' },
  { fecha: '2026-02-20', proveedor_id: 4, numero: 'REC-0134', importe: 340.00, forma_pago: 'Domiciliado', tipo_gasto: 'Servicio', formato: 'Recibo', vencimiento: '2026-03-20', estado: 'Pagado' },
  { fecha: '2026-03-01', proveedor_id: 1, numero: 'FAC-2026-024', importe: 1100.50, forma_pago: 'Transferencia', tipo_gasto: 'Comida', formato: 'Digital', vencimiento: '2026-03-16', estado: 'Pagado' },
  { fecha: '2026-03-05', proveedor_id: 5, numero: 'FAC-2026-027', importe: 850.00, forma_pago: 'Cheque', tipo_gasto: 'Mantenimiento', formato: 'Papel', vencimiento: '2026-04-05', estado: 'Pendiente' },
  { fecha: '2026-03-10', proveedor_id: 2, numero: 'FAC-2026-030', importe: 495.75, forma_pago: 'Domiciliado', tipo_gasto: 'Bebida', formato: 'Digital', vencimiento: null, estado: 'Pagado' },
  { fecha: '2026-03-18', proveedor_id: 3, numero: 'TKT-0089', importe: 165.00, forma_pago: 'Tarjeta', tipo_gasto: 'Consumible', formato: 'Ticket', vencimiento: null, estado: 'Pagado' },
  { fecha: '2026-04-02', proveedor_id: 1, numero: 'FAC-2026-041', importe: 1380.00, forma_pago: 'Transferencia', tipo_gasto: 'Comida', formato: 'Digital', vencimiento: '2026-04-17', estado: 'Pendiente' },
  { fecha: '2026-04-05', proveedor_id: 4, numero: 'REC-0158', importe: 320.00, forma_pago: 'Domiciliado', tipo_gasto: 'Servicio', formato: 'Recibo', vencimiento: '2026-05-05', estado: 'Pendiente' },
  { fecha: '2026-04-10', proveedor_id: 2, numero: 'FAC-2026-047', importe: 610.00, forma_pago: 'Domiciliado', tipo_gasto: 'Bebida', formato: 'Digital', vencimiento: null, estado: 'Pagado' },
  { fecha: '2026-04-15', proveedor_id: 5, numero: 'FAC-2026-052', importe: 3200.00, forma_pago: 'Pagaré', tipo_gasto: 'Varios', formato: 'Papel', vencimiento: '2026-07-15', estado: 'Pendiente' },
  { fecha: '2026-04-20', proveedor_id: 3, numero: 'TKT-0101', importe: 195.00, forma_pago: 'Efectivo', tipo_gasto: 'Consumible', formato: 'Ticket', vencimiento: null, estado: 'Pendiente' },
  { fecha: '2026-04-28', proveedor_id: 1, numero: 'FAC-2026-059', importe: 1520.75, forma_pago: 'Transferencia', tipo_gasto: 'Comida', formato: 'Digital', vencimiento: '2026-05-13', estado: 'Pendiente' },
];

export { users, customers, invoices, revenue, proveedores, gastos };

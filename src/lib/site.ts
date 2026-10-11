// Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local (international format, digits only, e.g. 5491112345678).
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export function whatsappLink(message: string): string {
  const text = encodeURIComponent(message);
  return WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

export type ModuleId = "web" | "catalog" | "booking" | "payments" | "whatsapp" | "management";

export const MODULES: {
  id: ModuleId;
  name: string;
  summary: string;
  detail: string;
}[] = [
  {
    id: "web",
    name: "Web",
    summary: "Tu sitio, con tu dominio",
    detail: "Página rápida y lista para celular, con tu marca, horarios, ubicación y datos de contacto. Es la base: los demás módulos se suman acá.",
  },
  {
    id: "catalog",
    name: "Catálogo",
    summary: "Productos o servicios con precio",
    detail: "Publicás lo que vendés, con fotos y precios. Lo actualizás vos desde el celular, sin depender de nadie.",
  },
  {
    id: "booking",
    name: "Turnos",
    summary: "Reservas online",
    detail: "Tus clientes eligen día y horario disponibles. Vos ves la agenda del día en un solo lugar.",
  },
  {
    id: "payments",
    name: "Cobros online",
    summary: "Señas y pagos con Mercado Pago",
    detail: "Cobrás señas, servicios o productos desde la web. La plata va directo a tu cuenta de Mercado Pago.",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    summary: "Consultas que no se pierden",
    detail: "Cada consulta de la web llega a tu WhatsApp con el detalle de lo que el cliente estaba mirando.",
  },
  {
    id: "management",
    name: "Gestión",
    summary: "Clientes, órdenes y presupuestos",
    detail: "Registro de clientes, órdenes de trabajo y presupuestos. Sabés qué está pendiente y qué ya se cobró.",
  },
];

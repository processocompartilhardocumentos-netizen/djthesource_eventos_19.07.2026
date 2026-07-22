import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const formatServices = (services) => {
  if (!Array.isArray(services)) {
    return "Nenhum serviço selecionado.";
  }

  if (!services.length) {
    return "Nenhum serviço selecionado.";
  }

  return services
    .map((item) => `- ${item.title || "Serviço"}: R$ ${Number(item.total || 0).toFixed(2)}`)
    .join("<br/>");
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        error: "RESEND_API_KEY não configurada nas variáveis de ambiente do Vercel.",
      });
    }

    const payload = req.body || {};
    const quote = payload.quote || {};

    const clientName = payload.clientName || payload.cliente || quote.clientName || "";
    const clientEmail = payload.clientEmail || payload.emailCliente || quote.clientEmail || "";
    const clientPhone = payload.clientPhone || payload.telefone || quote.clientPhone || "";
    const eventName = payload.eventName || payload.evento || quote.eventName || "";
    const organizerEmail = payload.organizerEmail || payload.emailOrganizador || "";
    const total = quote.total ?? payload.total ?? 0;
    const services = quote.items || payload.servicos || [];
    const salon = quote.salon || "";

    const destinationEmail = organizerEmail || process.env.RESEND_TO_EMAIL || "seu-email@exemplo.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Orcamento <onboarding@resend.dev>";

    const data = await resend.emails.send({
      from: fromEmail,
      to: [destinationEmail],
      replyTo: clientEmail || undefined,
      subject: `Novo Orçamento: ${eventName || "Evento"}`,
      html: `
        <h2>Novo orçamento recebido</h2>
        <p><strong>Cliente:</strong> ${clientName}</p>
        <p><strong>E-mail:</strong> ${clientEmail}</p>
        <p><strong>Telefone:</strong> ${clientPhone}</p>
        <p><strong>Evento:</strong> ${eventName}</p>
        <p><strong>Salão:</strong> ${salon || "—"}</p>
        <p><strong>Total:</strong> R$ ${Number(total || 0).toFixed(2)}</p>
        <h3>Serviços selecionados:</h3>
        <p>${formatServices(services)}</p>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Erro ao enviar o e-mail." });
  }
}

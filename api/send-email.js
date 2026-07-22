import { Resend } from "resend";

// Inicializa o Resend com a chave de API das variáveis de ambiente
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Garante que apenas requisições POST sejam aceitas
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const {
      cliente,
      emailCliente,
      telefone,
      evento,
      emailOrganizador,
      total,
      servicos,
    } = req.body;

    // Dispara o e-mail através da API do Resend
    const data = await resend.emails.send({
      from: "Orcamento <onboarding@resend.dev>", // Ou seu domínio verificado
      to: [emailOrganizador || "seu-email@exemplo.com"], // E-mail de destino
      subject: `Novo Orçamento: ${evento}`,
      html: `
        <h2>Novo Orçamento do Evento</h2>
        <p><strong>Cliente:</strong> ${cliente}</p>
        <p><strong>E-mail:</strong> ${emailCliente}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>Nome do Evento:</strong> ${evento}</p>
        <p><strong>Total:</strong> R$ ${total}</p>
        <h3>Serviços Selecionados:</h3>
        <p>${servicos}</p>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

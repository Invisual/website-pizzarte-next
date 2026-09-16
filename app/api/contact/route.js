import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const form = await req.formData();

    const name = form.get("name") || "";
    const surname = form.get("surname") || "";
    const email = form.get("email") || "";
    const tel = form.get("tel") || "";
    const interest = form.get("interest") || "";
    const city = form.get("city") || "";
    const message = form.get("message") || "";

    if (!email || !email.includes("@")) {
      return Response.json({ error: "Email inválido" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    /* console.log("HOST:", process.env.SMTP_HOST);
    console.log("USER:", process.env.SMTP_USER);
    console.log("PASS:", process.env.SMTP_PASS); */

    // EMAIL PARA ADMIN
    await transporter.sendMail({
      from: `"Website Ponto Urbano" <noreply@invisual.pt>`,
      to: "dev@invisual.pt",
      replyTo: email,
      subject: `Pedido de contacto pelo website por ${name}`,
      html: `
        <h2>Novo contacto</h2>
        <p><b>Nome:</b> ${name}</p>
        <p><b>Apelido:</b> ${surname}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Telefone:</b> ${tel}</p>
        <p><b>Interesse:</b> ${interest}</p>
        <p><b>Cidade:</b> ${city}</p>
        <p><b>Mensagem:</b> ${message}</p>
      `,
    });

    // EMAIL PARA USER (thank you)
    await transporter.sendMail({
      from: `"Ponto Urbano" <noreply@pontourbano.pt>`,
      to: email,
      subject: "Obrigado pelo seu contacto",
      html: `
        <p>Caro(a) ${name},</p>
        <p>Obrigado pelo seu contacto!</p>
        <p>Em breve entraremos em contacto consigo.</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Erro no envio" }, { status: 500 });
  }
}

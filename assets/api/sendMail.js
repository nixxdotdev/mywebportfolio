export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message, subject } = req.body;

  try {
    const response = await fetch("https://smtp.maileroo.com/api/v2/emails", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer 81c11e28c5173f98dfedab437ee82006cad0003bf253f876997fb5fc425020f1",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: {
          address: "nixxdotdev@b9231233c8650c7e.maileroo.org",
          display_name: "Web Portfolio Contact Form",
        },
        to: {
          address: "earlbandiola0403@gmail.com",
        },
        subject: subject || "Contact Form Submission",
        text: `${message}\n\nFrom: ${name}, ${email}`,
        html: `<h1>Feedback Form</h1>
                <p>Someone has trying reach you</p>
                <p>This is his/her message:</p>
                <i>"${message}"</i>
                <p>from: <b>${name}</b>, email: <b>${email}</b></p>
                `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res
        .status(500)
        .json({ error: data.error || "Failed to send email" });
    }

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
}

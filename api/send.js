const nodemailer = require("nodemailer")

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" })
  }

  const GMAIL_USER = process.env.GMAIL_USER
  const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS

  try {
    const { name, email, phone, message } = req.body || {}

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, error: "Name, email, and phone are required" })
    }

    if (!GMAIL_USER || !GMAIL_PASS) {
      return res.status(500).json({ success: false, error: "Email service not configured" })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: `"Hefé Agency" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: email,
      subject: "New Creator Application",
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message || "(no message)"}
`
    })

    res.status(200).json({ success: true, message: "Email sent" })
  } catch (err) {
    console.error("Email error:", err)
    res.status(500).json({
      success: false,
      error: err.message || "Failed to send email"
    })
  }
}

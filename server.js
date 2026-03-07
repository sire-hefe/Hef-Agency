require("dotenv").config()
const express = require("express")
const nodemailer = require("nodemailer")
const path = require("path")

const app = express()

app.use(express.json())
app.use(express.static("public"))   // local dev: serves from public/
app.use(express.static("."))        // fallback: serves from root (mirrors Vercel)

const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS

const handleSendEmail = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, error: "Name, email, and phone are required" })
    }

    if (!GMAIL_USER || !GMAIL_PASS) {
      console.error("Gmail credentials not configured. Add GMAIL_USER and GMAIL_APP_PASSWORD to your .env file.")
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

    res.json({ success: true, message: "Email sent" })
  } catch (err) {
    console.error("Email error:", err)
    res.status(500).json({
      success: false,
      error: err.message || "Failed to send email"
    })
  }
}

app.post("/send", handleSendEmail)
app.post("/api/send", handleSendEmail)

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000")
})
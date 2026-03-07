const form = document.getElementById("contactForm")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const submitBtn = form.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.disabled = true
  submitBtn.textContent = "Sending..."

  try {
    const data = new FormData(form)
    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        phone: data.get("phone"),
        message: data.get("message")
      })
    })

    const text = await response.text()
    let result
    try {
      result = JSON.parse(text)
    } catch {
      throw new Error("Server returned an invalid response")
    }

    if (result.success) {
      alert("Application sent successfully!")
      form.reset()
    } else {
      alert("Failed to send: " + (result.error || "Please try again later."))
    }
  } catch (err) {
    alert("Failed to send application. Check your connection and try again.")
    console.error(err)
  } finally {
    submitBtn.disabled = false
    submitBtn.textContent = originalText
  }
})
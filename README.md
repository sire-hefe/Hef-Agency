# Hefé Agency - Contact Form

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. **Gmail setup** (required for email to work):
   - Copy `.env.example` to `.env`
   - Add your Gmail address and [App Password](https://myaccount.google.com/apppasswords) to `.env`:
     ```
     GMAIL_USER=your-email@gmail.com
     GMAIL_APP_PASSWORD=your-16-char-app-password
     ```
   - Enable [2-Step Verification](https://myaccount.google.com/security) on your Google account to create an App Password

3. Run the server:
   ```bash
   npm start
   ```

4. Open http://localhost:3000 in your browser

## Deploy to Vercel

1. Push your code to GitHub (create a repo if needed).

2. Go to [vercel.com](https://vercel.com) and sign in.

3. Click **Add New** → **Project** and import your GitHub repository.

4. Configure the project:
   - **Framework Preset**: Other
   - **Build Command**: leave blank
   - **Output Directory**: leave blank (vercel.json handles routing)
   - **Install Command**: `npm install`

5. Add environment variables (Settings → Environment Variables):
   - `GMAIL_USER` = your Gmail address
   - `GMAIL_APP_PASSWORD` = your 16-character app password

6. Click **Deploy**. Your site will be live at `your-project.vercel.app`.

7. (Optional) Connect your Namecheap domain in Vercel: Project Settings → Domains → Add your domain.

## Troubleshooting

- **"Email service not configured"** – Set the `GMAIL_APP_PASSWORD` environment variable (locally in `.env`, on Vercel in Project Settings).
- **"Invalid login" or auth errors** – Use an App Password, not your regular Gmail password. Regular passwords no longer work with Gmail SMTP.
- **Form shows success but no email arrives** – Check the server console (local) or Vercel Function Logs (deployed). Gmail may block connections from new locations.

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  let resendClient: Resend | null = null;
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    resendClient = new Resend(resendKey);
  }

  // API routes
  app.post("/api/book", async (req, res) => {
    try {
      const { service, date, time, wantsReminder, phone } = req.body;
      
      if (!resendClient) {
        console.warn("RESEND_API_KEY is not configured. Email will not be sent.");
        // We still return success so the frontend WhatsApp flow can proceed
        return res.json({ success: true, message: "Email skipped - no API key" });
      }

      await resendClient.emails.send({
        from: "Nails By Purvi <onboarding@resend.dev>",
        to: "purviramani2@gmail.com",
        subject: "New Booking Request",
        html: `
          <h2>New Booking Request</h2>
          <p><strong>Service:</strong> ${service || "Not specified"}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          ${wantsReminder ? `<p><strong>Reminder Requested:</strong> Yes (24 hours prior)</p><p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p>User will reach out via WhatsApp to confirm.</p>
        `
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support Express v4 syntax
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

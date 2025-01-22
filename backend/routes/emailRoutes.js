import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mg from "../config/emailConfig.js";
const router = express.Router();

//  CLERSPECS DOAMIN CANT SEND MAIL NOW NEED TO CHANGE THE Configure proper SPF, DKIM, and DMARC records for your domain.

router.post("/generate-otp", async (req, res) => {
  const { email } = req.body;

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const data = {
    // from: `"Clerspecs" <postmaster@${process.env.MAILGUN_DOMAIN}>`,
    from: '"Clerspecs" <sales@clerspecs.com>',
    to: email,
    subject: "Your OTP for Verification",
    text: `Your OTP is: ${otp}`,
  };

  console.log("Data sent", data);

  try {
    await mg.messages().send(data);
    res.json({ message: "OTP sent successfully", otp });
  } catch (error) {
    console.error("Detailed Mailgun error:", error);
    if (error.message.includes("authorized recipients")) {
      res.status(403).json({
        error:
          "Email not authorized. Please use a test email address authorized in your Mailgun account.",
      });
    } else {
      res
        .status(500)
        .json({ error: "Failed to send OTP", details: error.message });
    }
  }
});
router.post("/sendQuery", async (req, res) => {
  const { email, message, name } = req.body;

  const data = {
    from: email,
    to: "sales@clerspecs.com",
    subject: `New Query from ${name}`,
    text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `,
  };

  try {
    await mg.messages().send(data);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Detailed Mailgun error:", error);
    if (error.message.includes("authorized recipients")) {
      res.status(403).json({
        error:
          "Email not authorized. Please use a test email address authorized in your Mailgun account.",
      });
    } else {
      res
        .status(500)
        .json({ error: "Failed to send query", details: error.message });
    }
  }
});

export default router;

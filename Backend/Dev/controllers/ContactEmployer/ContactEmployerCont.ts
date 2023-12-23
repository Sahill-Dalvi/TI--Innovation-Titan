import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const sendEmailToEmployer = async (req: Request, res: Response) => {
  const { name, email, message, employerEmail } = req.body;
  console.log(name, email, message, employerEmail);

  const emailConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "learnly.io@gmail.com",
      pass: "mhlqblzgdqrjotzq", //Auth tocken
    },
  };

  const mailOptions = {
    from: "learnly.io@gmail.com",
    to: employerEmail,
    subject: "TalentTrek - A Query from candidate",
    text: message,
  };

  try {
    // Create a nodemailer transporter using the email configuration
    const transporter = nodemailer.createTransport(emailConfig);

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

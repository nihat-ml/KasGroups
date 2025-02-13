import { createTransport } from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("Email göndərildi!");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default sendEmail;

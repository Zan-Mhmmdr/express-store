import nodemailer from "nodemailer";
import { config } from "./config.service";

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: 587,
  secure: false,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

export const sendMail = async (options: {
  to: string;
  subject: string;
  html: string;
}) => {
  const info = await transporter.sendMail({
    from: `"My App" <${config.smtp.user}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });

  return info;
};

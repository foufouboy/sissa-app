import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY n'est pas défini");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default sgMail;

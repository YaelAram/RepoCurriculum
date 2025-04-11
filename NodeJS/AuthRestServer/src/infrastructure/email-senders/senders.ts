import { envs } from "../../config/envs";
import { GmailEmailSender } from "./gmail.sender";

export const gmail = new GmailEmailSender({
  host: envs.serverUrl,
  pass: envs.mailSecret,
  user: envs.mailAddress,
  sendEmail: envs.sendEmail,
});

export const EmailSenders = {
  gmail,
};

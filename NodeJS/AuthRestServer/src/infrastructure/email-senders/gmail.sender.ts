import { type Transporter, createTransport } from "nodemailer";
import type { EmailSender } from "../../interfaces/types";

interface EmailSenderOptions {
  host: string;
  user: string;
  pass: string;
  sendEmail: boolean;
}

export class GmailEmailSender implements EmailSender {
  private readonly transporter: Transporter;
  private readonly host: string;
  private readonly sendEmail: boolean;

  constructor({ host, pass, user, sendEmail }: EmailSenderOptions) {
    this.host = host;
    this.sendEmail = sendEmail;
    this.transporter = createTransport({ service: "gmail", auth: { user, pass } });
  }

  sendVerificationEmail = async (to: string, token: string): Promise<boolean> => {
    console.log(`Sending email to ${to}`);
    try {
      if (!this.sendEmail) return true;

      await this.transporter.sendMail({
        to,
        subject: "Auth Server: Email verification",
        html: `
          <h1>Almost there...</h1>
          <p>
            To finish your sign up process please follow the next link.
            <a href="${this.host}/auth/validate-email/${token}">
              Verify my email address
            </a>.
          </p>
        `,
      });

      return true;
    } catch (error: any) {
      console.error(`EmailService [ERROR]: ${error.message}`);
      return false;
    }
  };
}

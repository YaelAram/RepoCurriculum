import crypto from "node:crypto";

export const checkGitHubSignature = (req: Request, secret: string) => {
  try {
    const signature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    const xHubSignature = req.headers.get("x-hub-signature-256");
    if (!xHubSignature) return false;

    const trusted = Buffer.from(`sha256=${signature}`, "ascii");
    const untrusted = Buffer.from(xHubSignature, "ascii");

    return crypto.timingSafeEqual(trusted, untrusted);
  } catch (error: any) {
    console.error(`Error verifying GitHub signature: ${error.message}`);
    return false;
  }
};

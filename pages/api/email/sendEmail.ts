import sendmail, { MailInput } from "sendmail";
import { emailAuthToken } from "../../../const/private";
import { apiPost } from "../../../lib/nextApi";

type Response = { result: "ok" };
type MailData = Pick<MailInput, "from" | "to" | "subject" | "html">;
type Params = MailData & {
    token: string;
};

export interface SendEmailProps {
    url: "/api/email/sendEmail";
    params: Params;
    response: Response;
}

const handler = async ({ token, ...mailInput }: Params): Promise<Response> => {
    if (token !== emailAuthToken) {
        throw new Error("unauthorized");
    }
    return sendEmail(mailInput);
};

async function sendEmail(mailData: MailData): Promise<Response> {
    return new Promise((resolve, reject) => {
        sendmail({})(mailData, function (err) {
            if (err) {
                reject();
                return;
            }
            resolve({ result: "ok" });
        });
    });
}

export default apiPost<SendEmailProps>(handler);

import { apiGet } from "../../../lib/nextApi";
import { EmptyObject } from "../../../types/util";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sendmail = require("sendmail")();

type Response = { reply: unknown; err: unknown };

export interface SendEmailProps {
    url: "/api/email/sendEmail";
    params: Params;
    response: Response;
}
type Params = EmptyObject;

const handler = async (): Promise<Response> => {
    return sendEmail();
};

async function sendEmail(): Promise<Response> {
    return new Promise(r => {
        sendmail(
            {
                from: "xxx@yyy.com",
                to: "kosukezaizen@yahoo.co.jp",
                subject: "メールのタイトルです",
                text: "メールの本文です。この例はテキストです。html形式でもOK。",
            },
            function (err: any, reply: any) {
                r({ reply, err: err && err.stack });
            }
        );
    });
}

export default apiGet<SendEmailProps>(handler);

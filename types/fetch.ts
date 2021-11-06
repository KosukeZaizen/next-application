export interface ErrorResponse {
    responseType: "system_error";
    message: string;
}

export type HandlerResponse<T> = T | ErrorResponse;

export type ServerResponse<T> =
    | (T & { responseType: "success" })
    | ErrorResponse;

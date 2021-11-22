import { FallingImage } from "../../../../components/shared/SeasonAnimation/type";
import { fetchZAppsFromServerSide } from "../../../../lib/fetch";
import { apiGet } from "../../../../lib/nextApi";
import { EmptyObject } from "../../../../types/util";

export interface GetFallingImages {
    url: "/api/zApps/fallingImage/getFallingImages";
    params: Params;
    response: Response;
}
type Params = EmptyObject;
type Response = { data: FallingImage[] };

const handler = async (): Promise<Response> => {
    const url = `api/FallingImage/GetFallingImages`;
    const response = await fetchZAppsFromServerSide(url);
    const data: FallingImage[] = await response.json();

    return { data };
};

export default apiGet(handler);

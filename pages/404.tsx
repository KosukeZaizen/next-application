import React from "react";
import { Helmet } from "../components/shared/Helmet";

function PageNotFound() {
    return (
        <>
            <Helmet
                title={"Page not found"}
                desc={"The page was not found."}
                domain={""}
                siteName={""}
                noindex
            />
            <h1>The page was not found.</h1>
        </>
    );
}

export default PageNotFound;

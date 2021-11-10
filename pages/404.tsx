import React from "react";
import { Helmet } from "../components/shared/Helmet";

function PageNotFound() {
    return (
        <>
            <Helmet noindex />
            <h1>The page was not found.</h1>
        </>
    );
}

export default PageNotFound;

// List of app names
export const appName = { articles: "articles" } as const;

const appNames = Object.keys(appName) as (keyof typeof appName)[];

// url info of each app
export const apps = appNames.reduce(
    (acc, name) => ({
        ...acc,
        [name]: {
            host: `${name}.lingual-ninja.com`,
            url: `https://${name}.lingual-ninja.com`,
        },
    }),
    {} as Apps
);
export type Apps = {
    [key in keyof typeof appName]: { host: string; url: string };
};

// Z-Apps info
export const Z_APPS_HOST = "www.lingual-ninja.com";
export const Z_APPS_TOP_URL = `https://${Z_APPS_HOST}`;

/**
 * 料金がかさむため、CDNの利用は取りやめ
 */
// const CDN_URL = "https://ninja-cdn.azureedge.net";
// export const BLOB_URL = `${CDN_URL}/lingual-storage`;

export const BLOB_URL =
    "https://lingualninja.blob.core.windows.net/lingual-storage";

export const ARTICLES_BLOB = `${BLOB_URL}/articles`;

export const APPS_PUBLIC_IMG_URL = `${BLOB_URL}/appsPublic/img/`;

export const AZURE_HOST = "next-application.azurewebsites.net";

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/c/LingualNinja";

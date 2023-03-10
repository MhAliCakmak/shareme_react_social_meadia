import sanityClient from "@sanity/client";
import  ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-03-25",
    token: process.env.REACT_APP_SANITY_TOKEN,
    withCredentials: true,
});

const builder=  ImageUrlBuilder(client)

export function urlFor(source) {
    return builder.image(source)
}

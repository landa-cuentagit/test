import { createClient } from "next-sanity";

const client = createClient({
    projectId: "otsftg3j",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: true
});

import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(client)

export function buildImages(source){
    const img = builder.image(source)
    return img
}

export const findContentByType = (type, sanityContents) => {
    return sanityContents.find((content) => content._type === type);
};
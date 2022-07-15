import sanityClient from '@sanity/client';
import imageURLBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'lk0ky7ll',
    dataset: 'production',
    apiVersion: '2022-07-12',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageURLBuilder(client);

export const urlFor = (source) => builder.image(source);
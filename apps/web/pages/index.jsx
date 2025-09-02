import Template from '../template/Template'

import Cover from '../sections/Cover';

import Footer from '../partials/Footer';

import useInViewEffect from '../partials/Inview';

import { createClient } from "next-sanity";

const client = createClient({
    projectId: "otsftg3j",
    dataset: "production",
    apiVersion: "2022-03-25"
});

export async function getServerSideProps() {

    const page_settings = await client.fetch(
        `
            *[_type == "page_settings" ][0]{
                ...
            }
        `
    );

    const cover = await client.fetch(
        `
            *[_type == "cover" ][0]{
                ...
            }
        `
    );

    const contact_section = await client.fetch(
        `
            *[_type == "contact" ][0]{
                ...
            }
        `
    );

    return {
        props: {
            page_settings,
            cover,
            contact_section
        }
    };
}

const Index = ({ page_settings, cover, contact_section }) => {

    useInViewEffect();

    return (
        <Template
            title={page_settings.title}
            description={page_settings.description}
            keywords={page_settings.keywords}
        >
            <Cover template='splash' cover_section={cover} />
            <Footer template='splash' contact_section={contact_section} />
        </Template>
    );
}

export default Index;
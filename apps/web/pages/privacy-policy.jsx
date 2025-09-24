import { useEffect } from 'react'

import Template from '../template/Template'

import Navigation from '../partials/Navigation';
import Privacy from '../sections/Privacy';
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

    const privacy_section = await client.fetch(
        `
            *[_type == "privacy" ][0]{
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
            contact_section,
            privacy_section
        }
    };
}

const PrivacyTemplate = ({ page_settings, contact_section, privacy_section }) => {

    useInViewEffect();
    
        useEffect(() => {
            let footer = document.querySelector('footer'),
                footerHeight = footer.offsetHeight,
                outerWrapper = document.querySelector('.outer-wrapper');
    
            if(window.innerWidth > 767) {
                outerWrapper.style.marginBottom = footerHeight + 'px';
            }
        }, [])

    return (
        <>
            <Navigation showIntro={false} contact_info={contact_section} template='privacy' activeSection={null} />
            <Template
                title={page_settings.title}
                description={page_settings.description}
                keywords={page_settings.keywords}
                >
                <Privacy template='splash' privacy_section={privacy_section} />
            </Template>
            <Footer template='privacy' contact_section={contact_section} />
        </>
    );
}

export default PrivacyTemplate;
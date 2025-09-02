import React, { useState, useEffect } from 'react'

import Template from '../template/Template'

import Navigation from '../partials/Navigation';
import Intro from '../sections/Intro';
import Cover from '../sections/Cover';
import SectionOne from '../sections/SectionOne';
import Destinations from '../sections/Destinations';
import Capabilities from '../sections/Capabilities';
import About from '../sections/About';

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

    const intro = await client.fetch(
        `
            *[_type == "intro" ][0]{
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

    const section_one = await client.fetch(
        `
            *[_type == "section_one" ][0]{
                ...
            }
        `
    );

    const destinations_section = await client.fetch(
        `
            *[_type == "destinations" ][0]{
                ...
            }
        `
    );

    const capabilities_section = await client.fetch(
        `
            *[_type == "capabilities" ][0]{
                ...
            }
        `
    );

    const about_section = await client.fetch(
        `
            *[_type == "about" ][0]{
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
            intro,
            cover,
            section_one,
            destinations_section,
            capabilities_section,
            about_section,
            contact_section
        }
    };
}

const Home = ({ page_settings, intro, cover, section_one, destinations_section, capabilities_section, about_section, contact_section }) => {

    useInViewEffect();

    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {

        const outerWrapper = document.querySelector('.outer-wrapper');
        outerWrapper.classList.add('intro-is-inview');

        const sectionIds = ['destinations', 'capabilities', 'about',  'contact'];
        const sections = sectionIds.map((id) => document.getElementById(id));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.6, // se activa cuando el 60% de la sección está visible
            }
        );

        sections.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Intro intro_section={intro} />
            <Template
                title={page_settings.title}
                description={page_settings.description}
                keywords={page_settings.keywords}
            >
                <Navigation contact_info={contact_section} template='home' activeSection={activeSection} />
                <Cover template='home' cover_section={cover} />
                <SectionOne section_one={section_one} />
                <Destinations destinations_section={destinations_section} />
                <Capabilities capabilities_section={capabilities_section} />
                <About about_section={about_section} />
                <Footer template='home' contact_section={contact_section} />
                <div className="show-intro" />
            </Template>
        </>
    );
}

export default Home;
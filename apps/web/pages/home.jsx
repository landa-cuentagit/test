import React, { useState, useEffect, useRef } from 'react'

import Template from '../template/Template'

import Navigation from '../partials/Navigation';
import Intro from '../sections/Intro';
import Cover from '../sections/Cover';
import SectionOne from '../sections/SectionOne';
import Destinations from '../sections/Destinations';
import Capabilities from '../sections/Capabilities';
import About from '../sections/About';

import Footer from '../partials/FooterSplash';

import useInViewEffect from '../partials/Inview';

import { createClient } from "next-sanity";

const client = createClient({
    projectId: "w4yam611",
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
                ...,
                "videoUrlOne": video1.asset->url,
                "videoUrlTwo": video2.asset->url
            }
        `
    );

    const section_one = await client.fetch(
        `
            *[_type == "section_one" ][0]{
                ...,
                "videoUrlOne": video1.asset->url,
                "videoUrlTwo": video2.asset->url,
                "videoUrlThree": video3.asset->url
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
                ...,
                all_capabilities[]{
                    capability_name,
                    text1,
                    text2,
                    image,
                    image_mobile,
                    "videoUrl": video.asset->url
                }
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

    const [showIntro, setShowIntro] = useState(true);
    const introRef = useRef(null);

    // Revisamos si hay hash en la URL
    useEffect(() => {
        if (window.location.hash) {
        // Si hay hash, no mostrar el intro automáticamente
        setShowIntro(false);
        }
    }, []);

    const handleShowIntro = () => {
        
        setShowIntro(true);

        // Reiniciar scroll interno del intro
        if (introRef.current) introRef.current.scrollTop = 0;
    };

    useInViewEffect();

    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {

        const outerWrapper = document.querySelector('.outer-wrapper');
        outerWrapper.classList.add('intro-is-inview');

        const sectionIds = ['portada', 'section-one', 'destinations', 'capabilities', 'about',  'contact'];
        const sections = sectionIds.map((id) => document.getElementById(id));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        console.log(entry.target.id)
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

    useEffect(() => {
        let outerWrapper = document.querySelector('.outer-wrapper')

        setTimeout(() => {
            outerWrapper.style.opacity = '1';
        }, 2500);
    }, [])

    useEffect(() => {
        let footer = document.querySelector('footer'),
            footerHeight = footer.offsetHeight,
            outerWrapper = document.querySelector('.outer-wrapper');

        if(window.innerWidth > 767) {
            outerWrapper.style.marginBottom = footerHeight + 'px';
        }
    }, [])

    const [playLottie, setPlayLottie] = useState(false);

    const [show, setShow] = useState(false);

    useEffect(() => {
        const hasSeen = localStorage.getItem("hasSeenIntro");

        if (!hasSeen) {
          setShow(true);
          localStorage.setItem("hasSeenIntro", "true");
        } else {
            setShowIntro(false)
            let allImagesWaiting= document.querySelectorAll('.wait-image-effect'),
                allTextWaiting = document.querySelectorAll('.wait-text-effect')

                let outerWrapper = document.querySelector('.outer-wrapper'),
                    navigation = document.querySelector('.navigation'),
                    footer = document.querySelector('footer'),
                    showIntroElement = document.querySelector('.show-intro');
            let html = document.querySelector('html')
            html.classList.remove('no-scroll')

            allImagesWaiting.forEach(image => {
                    image.classList.add('apply-effect')
                })
                setTimeout(() => {
                    allTextWaiting.forEach(text => {
                        text.classList.add('apply-effect')
                        navigation.style.opacity = '1';
                        footer.style.opacity = '1';
                        showIntroElement.style.opacity = '1';
                        setPlayLottie(true)
                    })
                }, 2000);
            outerWrapper.style.opacity = '1';
        }
    }, []);

    const sentinelRef = useRef(null);
    const [isStuck, setIsStuck] = useState(false);

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
        ([entry]) => {
            // Si el sentinel está visible, significa que llegaste al final del Template
            setIsStuck(entry.isIntersecting);
        },
        {
            root: null,
            threshold: 0,
            // Importante: detecta cuando el bottom del viewport toca el sentinel
            rootMargin: "0px 0px 1px 0px",
        }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {showIntro && (
                <Intro
                    ref={introRef}
                    onFadeInComplete={() => {
                        // Scroll suave del sitio solo después del fade-in
                        setTimeout(() => {
                            window.scrollTo({ top: 0 });
                        }, 750);
                    }}
                    intro_section={intro}
                    onFinish={() => setShowIntro(false)}
                    setPlayLottie={setPlayLottie}
                />
            )}
            <Navigation playLottie={playLottie} showIntro={showIntro} contact_info={contact_section} template='home' activeSection={activeSection} />
            <Template
                title={page_settings.title}
                description={page_settings.metadescription}
                keywords={page_settings.keywords}
                template='home'
            >
                <div id='portada' />
                <Cover template='home' cover_section={cover} />
                <div id='section-one'>
                    <SectionOne section_one={section_one} />
                </div>
                <div id='destinations'>
                    <Destinations destinations_section={destinations_section} />
                </div>
                <div id='capabilities'>
                    <Capabilities capabilities_section={capabilities_section} />
                </div>
                <div id='about'>
                    <About about_section={about_section} />
                </div>
                <div id='contact' />
                <div
                    className={`show-intro ${isStuck ? "is-stuck" : ""}`}
                    onClick={handleShowIntro}
                />
                <div ref={sentinelRef} className="template-end-sentinel" />
            </Template>
            <Footer template='home' contact_section={contact_section} />
        </>
    );
}

export default Home;
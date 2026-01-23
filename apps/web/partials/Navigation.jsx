import React, { useState, useEffect, useRef } from 'react'
import Lottie from "lottie-react";

import { LandaAnimated } from '../../../packages/ui';

const Navigation = ({ contact_info, template, activeSection, playLottie }) => {

    const lottieRef = useRef();

    useEffect(() => {
        console.log(playLottie)
        if(playLottie) {
            const timer = setTimeout(() => {
                // inicia la animación después de 1s
                lottieRef.current?.play();
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [playLottie]);

    const ListWrapper = useRef(null)

    const sections = ['portada', 'section-one', 'destinations', 'capabilities', 'about',  'contact'];

    const expandMenu = () => {
        let mobileSize = window.innerWidth,
            nav = document.querySelector('.navigation'),
            html = document.querySelector('html');

        if(mobileSize < 768) {
            if (nav.classList.contains('expanded')) {
                html.classList.remove('no-scroll');
                nav.classList.remove('expanded');
                ListWrapper.current.classList.remove('expanded');
            } else {
                html.classList.add('no-scroll');
                nav.classList.add('expanded');
                ListWrapper.current.classList.add('expanded');
            }
        }
    }

    const [isActive, setIsActive] = useState(false)

    const handleScroll = () => {

        const outerWrapper = document.querySelector('.outer-wrapper'),
                outerWrapperRect = outerWrapper.getBoundingClientRect(),
                outerWrapperTop = outerWrapperRect.top;

        if (outerWrapperTop < -30 && !isActive) {
            setIsActive(true);
        } else if (outerWrapperTop > -30 && isActive) {
            setIsActive(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll); // Limpiar el listener
        };
    }, [isActive]); // Dependencia de `isActive` para evitar re-renderizados innecesarios

    return (
        <>
            <div className="nav-blend" />
            <nav className={`navigation ${template} ${(template === 'privacy') ? 'with-background' : ''} ${(isActive) ? 'scrollTop' : '' }`}>
                <div className="holder">
                    <div className="content">
                        <a href={(template === 'home') ? '#' : '/home'} className="logo">
                            <Lottie
                                animationData={LandaAnimated}
                                loop={false} // Solo una vez
                                lottieRef={lottieRef}
                                autoplay={false}
                            />
                        </a>
                        <div className="toggle-wrapper visible-xs" onClick={expandMenu}>
                            <div className="toggle-btn">
                                <div className="bar"/>
                                <div className="bar"/>
                                <div className="bar"/>
                            </div>
                        </div>
                        <div className="list-content desktop" ref={ListWrapper}>
                            <div className="list-holder">
                                <a
                                    href={(template === 'home') ? `#${sections[2]}` : `/#${sections[2]}` }
                                    onClick={expandMenu}
                                        className={`opt btn-effect ${activeSection === sections[2] ? 'active' : ''}`}
                                >Desti<span>—</span>nations</a>
                                <a
                                    href={(template === 'home') ? `#${sections[3]}` : `/#${sections[3]}` }
                                    onClick={expandMenu}
                                        className={`opt btn-effect ${activeSection === sections[3] ? 'active' : ''}`}
                                >Capa<span>—</span>bilities</a>
                                <a
                                    href={(template === 'home') ? `#${sections[4]}` : `/#${sections[4]}` }
                                    onClick={expandMenu}
                                        className={`opt btn-effect ${activeSection === sections[4] ? 'active' : ''}`}
                                >A<span>—</span>bout</a>
                                <a
                                    href={(template === 'home') ? `#${sections[5]}` : `/#${sections[5]}` }
                                    onClick={expandMenu}
                                        className={`opt btn-effect ${activeSection === sections[5] ? 'active' : ''}`}
                                >Con<span>—</span>tact</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="list-wrapper mobile" ref={ListWrapper}>
                <div className="list-holder">
                    <a
                        href={(template === 'home') ? `#${sections[2]}` : `/#${sections[2]}` }
                        onClick={expandMenu}
                            className={`opt btn-effect ${activeSection === sections[2] ? 'active' : ''}`}
                    >Desti<span>—</span>nations</a>
                    <a
                        href={(template === 'home') ? `#${sections[3]}` : `/#${sections[3]}` }
                        onClick={expandMenu}
                            className={`opt btn-effect ${activeSection === sections[3] ? 'active' : ''}`}
                    >Capa<span>—</span>bilities</a>
                    <a
                        href={(template === 'home') ? `#${sections[4]}` : `/#${sections[4]}` }
                        onClick={expandMenu}
                            className={`opt btn-effect ${activeSection === sections[4] ? 'active' : ''}`}
                    >A<span>—</span>bout</a>
                    <a
                        href={(template === 'home') ? `#${sections[5]}` : `/#${sections[5]}` }
                        onClick={expandMenu}
                            className={`opt btn-effect ${activeSection === sections[5] ? 'active' : ''}`}
                    >Con<span>—</span>tact</a>
                </div>
                <div className="social-links">
                    <a href={contact_info.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href={contact_info.linkedin} target="_blank" rel="noopener noreferrer">Linkedin</a>
                </div>
            </div>
        </>
    );
}

export default Navigation;
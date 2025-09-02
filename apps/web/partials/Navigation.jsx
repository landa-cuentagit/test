import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image';

import { LandaLogo } from '../../../packages/ui';

const Navigation = ({ contact_info, template, activeSection }) => {

    const ListWrapper = useRef(null)

    const sections = ['destinations', 'capabilities', 'about',  'contact'];

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
            <nav className={`navigation ${(template === 'privacy') ? 'with-background' : ''} ${(isActive) ? 'scrollTop' : '' }`}>
                <div className="holder">
                    <div className="content">
                        <a href={(template === 'home') ? '#' : '/'} className="logo">
                            <Image
                                alt='Landa'
                                height={LandaLogo.height}
                                src={LandaLogo.src}
                                width={LandaLogo.width}
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
                                    href={(template === 'home') ? `#${sections[0]}` : `/#${sections[0]}` }
                                    onClick={expandMenu}
                                        className={`opt btn-effect ${activeSection === sections[0] ? 'active' : ''}`}
                                >Desti<span>—</span>nations</a>
                                <a
                                    href={(template === 'home') ? `#${sections[1]}` : `/#${sections[1]}` }
                                    onClick={expandMenu}
                                        className={`opt btn-effect ${activeSection === sections[1] ? 'active' : ''}`}
                                >Capa<span>—</span>bilities</a>
                                <a
                                    href={(template === 'home') ? `#${sections[2]}` : `/#${sections[2]}` }
                                    onClick={expandMenu}
                                        className={`opt btn-effect ${activeSection === sections[2] ? 'active' : ''}`}
                                >A<span>—</span>bout</a>
                                <a
                                    href={(template === 'home') ? `#${sections[3]}` : `/#${sections[3]}` }
                                    onClick={expandMenu}
                                        className={`opt btn-effect ${activeSection === sections[3] ? 'active' : ''}`}
                                >Con<span>—</span>tact</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="list-wrapper mobile" ref={ListWrapper}>
                <div className="list-holder">
                    <a
                        href={(template === 'home') ? `#${sections[0]}` : `/#${sections[0]}` }
                        onClick={expandMenu}
                            className={`opt btn-effect ${activeSection === sections[0] ? 'active' : ''}`}
                    >Desti<span>—</span>nations</a>
                    <a
                        href={(template === 'home') ? `#${sections[1]}` : `/#${sections[1]}` }
                        onClick={expandMenu}
                            className={`opt btn-effect ${activeSection === sections[1] ? 'active' : ''}`}
                    >Capa<span>—</span>bilities</a>
                    <a
                        href={(template === 'home') ? `#${sections[2]}` : `/#${sections[2]}` }
                        onClick={expandMenu}
                            className={`opt btn-effect ${activeSection === sections[2] ? 'active' : ''}`}
                    >A<span>—</span>bout</a>
                    <a
                        href={(template === 'home') ? `#${sections[3]}` : `/#${sections[3]}` }
                        onClick={expandMenu}
                            className={`opt btn-effect ${activeSection === sections[3] ? 'active' : ''}`}
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
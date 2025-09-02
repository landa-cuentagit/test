import React, { useState, useRef, useEffect } from 'react'
import { PortableText } from "next-sanity";
import { buildImages } from '../util/Helpers';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import "swiper/css/pagination";

// import required modules
import { EffectFade, Pagination } from 'swiper/modules';

const Intro = ({ intro_section }) => {

    const mainEffect = (event) => {

        let section = document.querySelector('.block.intro'),
            dummySectionOne = document.querySelector('.dummy-block.one'),
            dummySectionTwo = document.querySelector('.dummy-block.two'),
            dummySectionThree = document.querySelector('.dummy-block.three'),
            allDotsOne = document.querySelectorAll('.block.intro .swiper-pagination span'),
            dummyOne = dummySectionOne.getBoundingClientRect(),
            dummyTwo = dummySectionTwo.getBoundingClientRect(),
            dummyThree = dummySectionThree.getBoundingClientRect(),
            html = document.querySelector('html'),
            wrapperToEffect = document.querySelector('.wrapper-to-effect');

        if (dummyOne.top <= window.innerHeight) {
            section.style.top = 0;
            section.style.position = 'fixed';
        } else {
            section.style.bottom = 'unset';
            section.style.top = 0;
            section.style.position = 'absolute';
        }

        if (dummyOne.top <= window.innerHeight && dummyTwo.top >= window.innerHeight) {
            allDotsOne[0].click();
        }
        if (dummyTwo.top <= window.innerHeight && dummyThree.top >= window.innerHeight) {
            allDotsOne[1].click();
        }
        if (dummyThree.top <= window.innerHeight) {
            allDotsOne[2].click();
        }
        if (dummyThree.top <= window.innerHeight - 700) {
            /*section.style.bottom = 0;
            section.style.top = 'unset';
            section.style.position = 'absolute';*/
            setTimeout(() => {
                html.classList.add('no-scroll');
                wrapperToEffect.classList.add('going-hide');
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    setTimeout(() => {
                        html.classList.remove('no-scroll');
                        const outerWrapper = document.querySelector('.outer-wrapper');
                        outerWrapper.classList.remove('intro-is-inview');
                    }, 750);
                }, 750);
            }, 750);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', mainEffect)
    }, [])

    return (
        <div className="wrapper-to-effect">
            <section className="block intro">
                <div
                    className="background visible-xs"
                    style={{
                        background: `url(${buildImages(intro_section.image_mobile.asset._ref).url()})`
                    }}
                />
                <div
                    className="background hidden-xs"
                    style={{
                        background: `url(${buildImages(intro_section.image_desktop.asset._ref).url()})`
                    }}
                />
                <div className="scroll-indication">Scroll</div>
                <div className="holder">
                    <div className="content">
                        <div className="text-wrapper">
                            <Swiper
                                speed={750}
                                spaceBetween={30}
                                effect={'fade'}
                                modules={[EffectFade, Pagination]}
                                className="mySwiper"
                                allowTouchMove={false} 
                                    pagination={{
                                    clickable: true,
                                }}
                            >
                                <SwiperSlide>
                                    <div className="text-one">
                                        <PortableText value={intro_section.text1} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="text-two">
                                        <PortableText value={intro_section.text2} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="text-three">
                                        <PortableText value={intro_section.text3} />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
            <div className="dummy-block one"></div>
            <div className="dummy-block two"></div>
            <div className="dummy-block three"></div>
        </div>
    );
}

export default Intro;
import { useState, useEffect } from "react";
import { PortableText } from "next-sanity";
import { buildImages } from '../util/Helpers';
import { motion, useMotionValue, animate, useMotionValueEvent } from "framer-motion";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';

import Counter from "../partials/Counter";

const Destinations = ({ destinations_section }) => {

    const [swiperActiveIndex, setSwiperActiveIndex] = useState(0);

    useEffect(() => {
        const bullets = document.querySelectorAll('.block.destinations .swiper-pagination-bullet');

        bullets.forEach((bullet, i) => {
            const progressBar = bullet.querySelector('.block.destinations .progress-bar');
            if (i < swiperActiveIndex) {
                progressBar.style.width = '0%';
                progressBar.style.transition = 'none';
            } else if (i === swiperActiveIndex) {
                progressBar.style.width = '0%';
                progressBar.style.transition = 'none';
            } else {
                progressBar.style.width = '0%';
                progressBar.style.transition = 'none';
            }
        });

        // Activa animación en la barra actual
        const activeBullet = bullets[swiperActiveIndex]?.querySelector('.block.destinations .progress-bar');
        if (activeBullet) {
            setTimeout(() => {
                activeBullet.style.width = '100%';
                activeBullet.style.transition = 'width 5000ms linear';
            }, 10);
        }
    }, [swiperActiveIndex]);

    return (
        <section className="block destinations">
            <div className="holder">
                <div className="header">
                    <div className="header-content text-effect">
                        <div className="title">{destinations_section.section_title}</div>
                        <div className="desc">{destinations_section.hidden_phrase}</div>
                    </div>
                    <div className="number text-effect">1.0</div>
                    <div className="line to-right" />
                </div>
                <div className="content">
                    <div className="text-wrapper">
                        <div className="text-holder">
                            <div className="text-one text-effect">
                                <PortableText value={destinations_section.text1} />
                            </div>
                            <div className="text-two text-effect">
                                <PortableText value={destinations_section.text2} />
                            </div>
                        </div>
                    </div>
                    <div className="carrousel-wrapper simple-effect">
                        {
                            destinations_section.all_destinations.map((destiny, index) => (
                                <a href={destiny.link_maps} target='_blank' rel="noopener noreferrer" key={index} className="coords-wrapper"><Counter targetNumber={destiny.first_coord} trigger={swiperActiveIndex} />º N, <Counter targetNumber={destiny.second_coord} trigger={swiperActiveIndex} />º E</a>
                            ))
                        }
                        <Swiper
                            speed={2000}
                            spaceBetween={30}
                            effect={'fade'}
                            className="mySwiper"
                            allowTouchMove={false}
                            pagination={{
                                clickable: true,
                                renderBullet: (index, className) => `
                                <span class="${className}">
                                    <span class="progress-bar"></span>
                                </span>
                                `,
                            }}
                            autoplay={{ delay: 3000 }}
                            loop
                            modules={[EffectFade, Autoplay, Pagination]}

                            onSlideChangeTransitionStart={(swiper) => {
                                setSwiperActiveIndex(swiper.realIndex);
                            }}
                            onSlideChangeTransitionEnd={(swiper) => {
                                const bullets = document.querySelectorAll('.swiper-pagination-bullet');
                                const activeBullet = bullets[swiper.realIndex]?.querySelector('.progress-bar');
                                if (activeBullet) {
                                    setTimeout(() => {
                                        activeBullet.style.width = '100%';
                                        activeBullet.style.transition = 'width 3s linear';
                                    }, 10); // Pequeño delay para aplicar la animación
                                }
                            }}
                            onSwiper={(swiper) => {
                                // Pintar progresivamente la barra inicial después de que Swiper esté listo
                                const bullets = document.querySelectorAll('.swiper-pagination-bullet');
                                const firstBullet = bullets[0]?.querySelector('.progress-bar');
                                if (firstBullet) {
                                setTimeout(() => {
                                    firstBullet.style.width = '100%';
                                    firstBullet.style.transition = 'width 3s linear';
                                }, 10); // Pequeño delay para aplicar la transición
                                }
                            }}
                        >
                            {
                                destinations_section.all_destinations.map((destiny, index) => (
                                    <SwiperSlide className="destiny" key={index}>
                                        {
                                            (destiny.link_secondary)
                                                ?
                                                    <a href={destiny.link_secondary} target='_blank' rel="noopener noreferrer">
                                                        <div
                                                            className="destiny-background hidden-xs"
                                                            style={{
                                                                background: `url(${buildImages(destiny.image.asset._ref).url()})`
                                                            }}
                                                        />
                                                        <div
                                                            className="destiny-background visible-xs"
                                                            style={{
                                                                background: `url(${buildImages(destiny.image_mobile.asset._ref).url()})`
                                                            }}
                                                        />
                                                        <div className="destiny-name">{destiny.destiny_name}</div>
                                                        <div className="destiny-info">
                                                            <div className="destiny-location-one">{destiny.location1}</div>
                                                            <div className="destiny-location-two">{destiny.location2}</div>
                                                            <div className="destiny-text">
                                                                <PortableText value={destiny.text} />
                                                            </div>
                                                        </div>
                                                    </a>
                                                :
                                                <>
                                                    <div
                                                        className="destiny-background hidden-xs"
                                                        style={{
                                                            background: `url(${buildImages(destiny.image.asset._ref).url()})`
                                                        }}
                                                    />
                                                    <div
                                                        className="destiny-background visible-xs"
                                                        style={{
                                                            background: `url(${buildImages(destiny.image_mobile.asset._ref).url()})`
                                                        }}
                                                    />
                                                    <div className="destiny-name">{destiny.destiny_name}</div>
                                                    <div className="destiny-info">
                                                        <div className="destiny-location-one">{destiny.location1}</div>
                                                        <div className="destiny-location-two">{destiny.location2}</div>
                                                        <div className="destiny-text">
                                                            <PortableText value={destiny.text} />
                                                        </div>
                                                    </div>
                                                </>
                                        }
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                    <a href="#contact" className="cta simple-effect">{destinations_section.cta_text}</a>
                </div>
            </div>
        </section>
    );
}

export default Destinations;
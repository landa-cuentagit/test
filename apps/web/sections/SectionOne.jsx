import { PortableText } from "next-sanity";
import Image from "next/image";
import { buildImages } from "../util/Helpers";
import { useEffect, useRef } from "react";

const SectionOne = ({ section_one }) => {

    const ImageWrapperOne = useRef(null),
            ImageWrapperTwo = useRef(null),
            ImageWrapperThree = useRef(null);

    const ImageWrapperOneMobile = useRef(null),
            ImageWrapperTwoMobile = useRef(null),
            ImageWrapperThreeMobile = useRef(null);

    useEffect(() => {
        const allStrongs = document.querySelectorAll('.block.section-one strong');

        if(allStrongs) {

            allStrongs.forEach((strong, index) => {
                strong.addEventListener('mouseover', () => {
                    if(index === 0) {
                        ImageWrapperOne.current.classList.add('inview');
                    }
                    if(index === 1) {
                        ImageWrapperTwo.current.classList.add('inview');
                    }
                    if(index === 2) {
                        ImageWrapperThree.current.classList.add('inview');
                    }
                })
                strong.addEventListener('mouseleave', () => {
                    ImageWrapperOne.current.classList.remove('inview');
                    ImageWrapperTwo.current.classList.remove('inview');
                    ImageWrapperThree.current.classList.remove('inview');
                })

                if (window.innerWidth < 768) {
                    strong.addEventListener('click', () => {
                        if(index === 0) {
                            ImageWrapperOneMobile.current.classList.add('inview');
                            ImageWrapperTwoMobile.current.classList.remove('inview');
                            ImageWrapperThreeMobile.current.classList.remove('inview');
                        }
                        if(index === 1) {
                            ImageWrapperOneMobile.current.classList.remove('inview');
                            ImageWrapperTwoMobile.current.classList.add('inview');
                            ImageWrapperThreeMobile.current.classList.remove('inview');
                        }
                        if(index === 2) {
                            ImageWrapperOneMobile.current.classList.remove('inview');
                            ImageWrapperTwoMobile.current.classList.remove('inview');
                            ImageWrapperThreeMobile.current.classList.add('inview');
                        }
                    })
                }
            })
        }
    }, [])

    return (
        <section className="block section-one">
            <div className="holder">
                <div className="content">
                    <div className="text-wrapper">
                        <div className="text text-effect">
                            <PortableText value={section_one.text} />
                        </div>
                        <a href="#contact" className="cta simple-effect">{section_one.cta_text}</a>
                    </div>

                    <div className="image-wrapper one visible-xs inview" ref={ImageWrapperOneMobile}>
                        <div className="image">
                            {
                                (section_one.videoUrlOne)
                                    ?
                                        <video src={section_one.videoUrlOne} loop muted autoPlay />
                                    :
                                        <Image
                                            alt="Landa"
                                            height={163}
                                            src={buildImages(section_one.image1.asset._ref).url()}
                                            width={262}
                                        />
                            }
                        </div>
                    </div>

                    <div className="image-wrapper two visible-xs" ref={ImageWrapperTwoMobile}>
                        <div className="image">
                            {
                                (section_one.videoUrlTwo)
                                    ?
                                        <video src={section_one.videoUrlTwo} loop muted autoPlay />
                                    :
                                        <Image
                                            alt="Landa"
                                            height={163}
                                            src={buildImages(section_one.image2.asset._ref).url()}
                                            width={262}
                                        />
                            }
                        </div>
                    </div>

                    <div className="image-wrapper three visible-xs" ref={ImageWrapperThreeMobile}>
                        <div className="image">
                            {
                                (section_one.videoUrlThree)
                                    ?
                                        <video src={section_one.videoUrlThree} loop muted autoPlay />
                                    :
                                        <Image
                                            alt="Landa"
                                            height={163}
                                            src={buildImages(section_one.image3.asset._ref).url()}
                                            width={262}
                                        />
                            }
                        </div>
                    </div>

                    <div className="image-wrapper hidden-xs" ref={ImageWrapperOne}>
                        <div className="image">
                            {
                                (section_one.videoUrlOne)
                                    ?
                                        <video src={section_one.videoUrlOne} loop muted autoPlay />
                                    :
                                        <Image
                                            alt="Landa"
                                            height={163}
                                            src={buildImages(section_one.image1.asset._ref).url()}
                                            width={262}
                                        />
                            }
                        </div>
                    </div>

                    <div className="image-wrapper hidden-xs" ref={ImageWrapperTwo}>
                        <div className="image">
                            {
                                (section_one.videoUrlTwo)
                                    ?
                                        <video src={section_one.videoUrlTwo} loop muted autoPlay />
                                    :
                                        <Image
                                            alt="Landa"
                                            height={163}
                                            src={buildImages(section_one.image2.asset._ref).url()}
                                            width={262}
                                        />
                            }
                        </div>
                    </div>

                    <div className="image-wrapper hidden-xs" ref={ImageWrapperThree}>
                        <div className="image">
                            {
                                (section_one.videoUrlThree)
                                    ?
                                        <video src={section_one.videoUrlThree} loop muted autoPlay />
                                    :
                                        <Image
                                            alt="Landa"
                                            height={163}
                                            src={buildImages(section_one.image3.asset._ref).url()}
                                            width={262}
                                        />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SectionOne;
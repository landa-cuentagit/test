import { PortableText } from "next-sanity";
import Image from "next/image";
import { buildImages } from "../util/Helpers";
import { useEffect, useRef } from "react";

const SectionOne = ({ section_one }) => {

    const ImageWrapper = useRef(null)

    useEffect(() => {
        const allStrongs = document.querySelectorAll('.block.section-one strong');

        if(allStrongs) {

            allStrongs.forEach(strong => {
                strong.addEventListener('mouseover', () => {
                    ImageWrapper.current.classList.add('inview');
                })
                strong.addEventListener('mouseleave', () => {
                    ImageWrapper.current.classList.remove('inview');
                })
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

                    <div className="image-wrapper" ref={ImageWrapper}>
                        <div className="image">
                            <Image
                                alt="Landa"
                                height={163}
                                src={buildImages(section_one.image1.asset._ref).url()}
                                width={262}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SectionOne;
import { PortableText } from "next-sanity";
import { buildImages } from "../util/Helpers";
import Image from "next/image";

import { LandaLogo } from "../../../packages/ui";

const Cover = ({ template, cover_section }) => {
    return (
        <section className="block cover">
            {
                (template === 'splash')
                    ?
                        <div className="logo">
                            <Image
                                alt="Landa"
                                height={LandaLogo.height}
                                src={LandaLogo.src}
                                width={LandaLogo.width}
                            />
                        </div>
                    :
                        null
            }
            <div
                className="background-one"
                style={{
                    background: `url(${buildImages(cover_section.image1.asset._ref).url()})`
                }}
            />
            <div
                className="background-two"
                style={{
                    background: `url(${buildImages(cover_section.image2.asset._ref).url()})`
                }}
            />
            <div className="holder">
                <div className="content">
                    <div className="text-wrapper">
                        <div className="text text-effect">
                            <PortableText value={cover_section.text} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cover;
import React, { useEffect, useRef, useState } from "react";

function TypingRotator({
    sentences = [
        "Typing text effect",
        "Enhance your site with dynamic text",
        "Animate messages effortlessly",
        "Add elegance with versatile text",
        "Bring words to life on your site",
    ],
    speed = 70,       // ms entre “teclas”
    pauseSteps = 15,  // ticks de pausa al terminar de escribir
    className = "",
    }) {
    const [text, setText] = useState("");
    const indexRef = useRef(0);
    const offsetRef = useRef(0);
    const forwardsRef = useRef(true);
    const skipRef = useRef(0);

    useEffect(() => {
        const id = setInterval(() => {
        const currentSentence = sentences[indexRef.current];
        const forwards = forwardsRef.current;
        let offset = offsetRef.current;
        let skip = skipRef.current;

        if (forwards) {
            if (offset >= currentSentence.length) {
            // pausa al final
            skip += 1;
            if (skip === pauseSteps) {
                forwardsRef.current = false; // empieza a borrar
                skip = 0;
            }
            }
        } else if (offset === 0) {
            // pasamos a la siguiente frase
            forwardsRef.current = true;
            indexRef.current = (indexRef.current + 1) % sentences.length;
        }

        if (skip === 0) {
            offset = forwardsRef.current ? offset + 1 : offset - 1;
        }

        // guardar estados mutables
        offsetRef.current = Math.max(0, offset);
        skipRef.current = skip;

        const nextSentence = sentences[indexRef.current];
        setText(nextSentence.substring(0, offsetRef.current));
        }, speed);

        return () => clearInterval(id);
    }, [sentences, speed, pauseSteps]);

    return (
        <span className={className}>
        <span className="sentence">{text}</span>
        <span className="cursor">_</span>
        </span>
    );
}

export default TypingRotator;

import { useEffect } from "react";

const initLazyVideos = (selector = ".lazy-video") => {

    useEffect(() => {
        const videos = document.querySelectorAll(selector);

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const video = entry.target;

                if (video.dataset.loaded) return;

                if (video.dataset.src) {
                    video.src = video.dataset.src;
                }

                video.load();
                video.dataset.loaded = "true";

                obs.unobserve(video);
            });
        }, { threshold: 0.25 });

        videos.forEach(video => observer.observe(video));
    }, [])
}

export default initLazyVideos;
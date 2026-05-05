import React, { useEffect, useState } from 'react'
import '../design/styles/main.scss'
import Head from "next/head";
import Loader from '../partials/Loader';

export default function MyApp({ Component, pageProps, router }) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simula carga inicial
        const timer = setTimeout(() => {
            setLoading(false);
        }, 750); // ajusta tiempo

        return () => clearTimeout(timer);
    }, []);

    return(
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {loading && <Loader />}
            <Component {...pageProps} key={router.asPath} />
        </>
    )
}
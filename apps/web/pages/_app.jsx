import React from 'react'
import '../design/styles/base.scss'
import Head from "next/head";

export default function MyApp({ Component, pageProps, router }) {

    return(
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} key={router.asPath} />
        </>
    )
}
import React from 'react'
import '../design/styles/base.scss'

export default function MyApp({ Component, pageProps, router }) {

    return(
        <>
            <Component {...pageProps} key={router.asPath} />
        </>
    )
}
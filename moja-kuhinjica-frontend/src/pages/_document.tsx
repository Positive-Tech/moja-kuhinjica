import Document from 'next/document'
import { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Nunito&family=Open+Sans&family=Poppins:wght@300;400&family=Londrina+Solid&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="shortcut icon" href="/logo-moja-klopica.svg" />
                    <title>Dunda</title>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

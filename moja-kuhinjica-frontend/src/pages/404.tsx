import Link from 'next/link'

const NotFound = (): JSX.Element => {
    return (
        <div className="notFound">
            <h1>404</h1>
            <h2>Stranica ne postoji</h2>
            <Link href="/" style={{ textDecoration: 'none' }}>
                <p>Povratak na pocetnu stranicu</p>
            </Link>
        </div>
    )
}

export default NotFound

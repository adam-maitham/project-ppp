import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

function Home() {
	return (
		<>
			<Head>
				<title>Home | Games Site</title>
			</Head>
			<h1>Welcome to the Games Site</h1>
			<p>This site was made for Adam Abid's PPP.</p>
			<Link className={styles.pageLink} href="/games">Enter the Games Site</Link>
		</>
	)
}

export default Home;
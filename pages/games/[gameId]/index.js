import Head from 'next/head';
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../../../styles/Games.module.css';

function GamePage(props) {
	const router = useRouter();
	
	return (
		<>
			<Head>
				<title>{props.name} | Games Site</title>
			</Head>
			<h1>{props.name}</h1>
			<img src={props.image} className={styles.gameCover}/>
			<p>{props.description}</p>
			<Link className={styles.smallLink} href={"/games/" + router.query.gameId + "/edit"}>Edit</Link>
			<Link className={styles.smallLink} href="#" onClick={() => {
				fetch('http://localhost:3000/api/games/' + router.query.gameId + '/delete').then(router.push("/games/"))
			}}>Delete</Link>
		</>
	)
}

export async function getStaticPaths(context) {
	return {
		fallback: true,
		paths: [
			{ params: { gameId: "0" } },
			{ params: { gameId: "1" } },
		]
	}
}

export async function getStaticProps(context) {
	const response = await fetch('http://localhost:3000/api/games/' + context.params.gameId, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();
	
	return {
		props: data,
		revalidate: 10
	}
}

export default GamePage;
import Head from 'next/head'
import Link from 'next/link'
import Game from '../../components/game'
import styles from '../../styles/Games.module.css'

function GamesList(props) {
	return (
		<>
			<Head>
				<title>Games | Games.com</title>
			</Head>
			<h1 className={styles.bigTitle}>Games<Link className={styles.addButton} href="/games/add">+Add</Link></h1>
			<div className={styles.flex}>
				{props.items.map((item) => (
					<Game id={item.id} name={item.name} description={item.description} image={item.image}/>
				))}
			</div>
		</>
	);
}

export async function getStaticProps(context) {
	const response = await fetch('http://localhost:3000/api/games', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	
	const data = await response.json();
	
	return {
		props: {
			items: data.items
		}
	}
}

export default GamesList;
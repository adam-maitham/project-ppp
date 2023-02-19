import Link from 'next/link'
import styles from './game.module.css';

function Game(props) {
	return (
		<Link href={"/games/" + props.id} passHref={true} className={styles.gameContainer}>
			<img className={styles.gameCover} src={props.image}/>
			<h1 className={styles.gameTitle}>{props.name}</h1>
			<div className={styles.gameDesc}>{props.description}</div>
		</Link>
	);
}

export default Game;
import Head from 'next/head'
import { useRef } from 'react'
import { Router, useRouter } from 'next/router'

function EditGamePage(props) {
	const router = useRouter();
	const nameInputRef = useRef();
	const descriptionInputRef = useRef();
	const imageInputRef = useRef();
	
	function submitForm(event) {
		event.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredDescription = descriptionInputRef.current.value;
		const enteredImage = imageInputRef.current.value;
		
		const data = {
			id: router.query.gameId,
			name: enteredName,
			description: enteredDescription,
			image: enteredImage,
		};
		
		fetch('http://localhost:3000/api/games/' + router.query.gameId + '/edit', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		
		router.push('/games')
	}
	
	return (
		<>
			<Head>
				<title>Edit Game | Games Site</title>
			</Head>
			<form onSubmit={submitForm}>
				<div>
					<label htmlFor="name">Game Name</label>
					<input id="name" ref={nameInputRef} defaultValue={props.name}></input>
				</div>
				<div>
					<label htmlFor="description">Game Description</label>
					<input id="description" ref={descriptionInputRef} defaultValue={props.description}></input>
				</div>
				<div>
					<label htmlFor="image">Game Cover Image</label>
					<input id="image" ref={imageInputRef} defaultValue={props.image}></input>
				</div>
				<button type="submit">Submit</button>
			</form>
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
		props: data
	}
}

export default EditGamePage;
import Head from 'next/head'
import { useRef } from 'react'
import { useRouter } from 'next/router'

function AddGamePage(props) {
	const router = useRouter();
	const nameInputRef = useRef();
	const descriptionInputRef = useRef();
	const imageInputRef = useRef();
	
	function submitForm(event) {
		event.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredDescription = descriptionInputRef.current.value;
		const enteredImage = imageInputRef.current.value;
		
		const toBeMade = {
			name: enteredName,
			description: enteredDescription,
			image: enteredImage,
		};
		
		fetch('http://localhost:3000/api/games', {
			method: 'POST',
			body: JSON.stringify(toBeMade),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		router.push('/games');
	}
	
	return (
		<>
			<Head>
				<title>Add Game | Games Site</title>
			</Head>
			<form onSubmit={submitForm}>
				<div>
					<label htmlFor="name">Game Name</label>
					<input id="name" ref={nameInputRef}></input>
				</div>
				<div>
					<label htmlFor="description">Game Description</label>
					<input id="description" ref={descriptionInputRef}></input>
				</div>
				<div>
					<label htmlFor="image">Game Cover Image</label>
					<input id="image" ref={imageInputRef}></input>
				</div>
				<button type="submit">Submit</button>
			</form>
		</>
	)
}

export default AddGamePage;
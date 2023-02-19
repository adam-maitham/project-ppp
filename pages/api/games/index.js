import fs from 'fs'
import path from 'path'

async function handler(req, res) {
	if (req.method === 'GET') {
		const filePath = path.join(process.cwd(), 'data', 'games.json');
		const fileData = JSON.parse(fs.readFileSync(filePath));
		res.status(200).json({ items: fileData });
	}
	else if (req.method === 'POST') {
		const filePath = path.join(process.cwd(), 'data', 'games.json');
		const fileData = JSON.parse(fs.readFileSync(filePath));
		
		var lowest = 0;
		fileData.forEach(function(i) {
			if (Number(i.id) >= lowest) { lowest = Number(i.id) + 1; }
		});
		
		const data = {
			id: lowest,
			name: req.body.name,
			description: req.body.description,
			image: req.body.image,
		}
		
		fileData.push(data);
		fs.writeFileSync(filePath, JSON.stringify(fileData));
		res.status(201).json({ message: 'success' });
	}
}

export default handler;
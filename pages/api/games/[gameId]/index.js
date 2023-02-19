import fs from 'fs'
import path from 'path'

async function handler(req, res) {
	if (req.method === 'GET') {
		const filePath = path.join(process.cwd(), 'data', 'games.json');
		const fileData = JSON.parse(fs.readFileSync(filePath));
		const data = fileData.find(i => i.id == req.query.gameId)
		res.status(200).json(data);
	}
	else if (req.method === 'POST') {
		const filePath = path.join(process.cwd(), 'data', 'games.json');
		const fileData = JSON.parse(fs.readFileSync(filePath));
		
		const data = req.body;
		
		fileData.push(data);
		fs.writeFileSync(filePath, JSON.stringify(fileData));
		res.status(201).json({ message: 'success' });
	}
}

export default handler;
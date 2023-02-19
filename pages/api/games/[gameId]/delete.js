import fs from 'fs'
import path from 'path'

async function handler(req, res) {
	if (req.method === 'GET') {
		const filePath = path.join(process.cwd(), 'data', 'games.json');
		const fileData = JSON.parse(fs.readFileSync(filePath));
		const data = fileData.find(i => i.id == req.query.gameId);
		const index = fileData.indexOf(data);
		fileData.splice(index, 1);
		fs.writeFileSync(filePath, JSON.stringify(fileData));
		res.status(200).json({ message: 'success' });
	}
}

export default handler;
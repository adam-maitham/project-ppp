import fs from 'fs'
import path from 'path'

async function handler(req, res) {
	if (req.method === 'POST') {
		const filePath = path.join(process.cwd(), 'data', 'games.json');
		const fileData = JSON.parse(fs.readFileSync(filePath));
		const data = fileData.find(i => i.id == req.query.gameId);
		
		console.log(fileData);
		console.log(data);
		
		if (data) {
			var index = fileData.indexOf(data);
			console.log(index);
			fileData[index] = req.body;
			fs.writeFileSync(filePath, JSON.stringify(fileData));
		}
		res.status(200).json({ message: 'success' });
	}
}

export default handler;
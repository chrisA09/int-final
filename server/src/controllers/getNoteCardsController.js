import Note from '../models/Note.js';

export async function getNoteCardsController(req, res) {
	const { noteId } = req.params;
	const cards = await Note.findById(noteId);
	res.json(cards);
}

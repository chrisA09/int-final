import Note from '../models/Note.js';

export async function createCardDeckController(req, res) {
	const noteId = req.params.noteId;
	const note = await Note.findById(noteId);
	const card = req.body;
	note.cards.push(card);
	await note.save();
	res.json(note);
}

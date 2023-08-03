import Note from '../models/Note.js';

export async function createCardDeckController(req, res) {
	const noteId = req.params.noteId;
	const note = await Note.findById(noteId);
	// aca deberia atajar un error en caso de que no se encuentre noteId/note
	const card = req.body.cardContent;
	note.cards.push(card);
	// console.log(card);
	await note.save();
	res.json(note);
}

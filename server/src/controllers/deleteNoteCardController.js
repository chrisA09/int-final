import Note from '../models/Note.js';

export async function deleteNoteCardController(req, res) {
	const noteId = req.params.noteId;
	const card = await Note.findByIdAndDelete(noteId);
	res.json(card);
}

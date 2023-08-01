import Note from '../models/Note.js';

export async function deleteNoteController(req, res) {
	const noteId = req.params.noteId;
	const note = await Note.findByIdAndDelete(noteId);
	res.json(note);
}

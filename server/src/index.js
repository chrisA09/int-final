import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';

import Note from './models/Note.js';

import cors from 'cors';
import { getNotesController } from './controllers/getNotesController.js';
import { createNoteController } from './controllers/createNoteController.js';
import { deleteNoteController } from './controllers/deleteNoteController.js';
import { createCardDeckController } from './controllers/createCardDeckController.js';

const app = express();
const port = 3000;

/*==================	express midlleware function	================*/
app.use(cors());
app.use(express.json());

/*==================	API endpoints	================*/
/*==================	cards endpoints	================*/

app.get('/notes', getNotesController);
app.post('/notes', createNoteController);
app.delete('/notes/:noteId', deleteNoteController);

/*==================	cards endpoints	================*/

app.post('/notes/:noteId/cards', createCardDeckController);

/*==================	API endpoints	================*/

//coneccion con DB
mongoose.connect(process.env.MONGO_URL).then(() => {
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
});

/*
app.post('notes/:noteId/cards', async (req, res) => {
	const noteId = req.params.noteId;
	const note = await Note.findById(noteId);
	if (!note) return res.status(400).send('no note of this id exists');
	const cardContent = req.body; //el contenido de cada tarjeta se va a encontrar en el cuerpo de la DB.
	note.cards.push(cardContent);
	await note.save();
	res.json(note);
});
*/

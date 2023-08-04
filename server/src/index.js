import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';

import Note from './models/Note.js';

import cors from 'cors';
import { getNotesController } from './controllers/getNotesController.js';
import { createNoteController } from './controllers/createNoteController.js';
import { deleteNoteController } from './controllers/deleteNoteController.js';
import { createNoteCardController } from './controllers/createNoteCardController.js';
import { getNoteCardsController } from './controllers/getNoteCardsController.js';

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

app.get('/notes/:noteId/', getNoteCardsController);
app.post('/notes/:noteId/cards', createNoteCardController);

/*==================	API endpoints	================*/

//coneccion con DB
mongoose.connect(process.env.MONGO_URL).then(() => {
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
});

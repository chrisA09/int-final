import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';

import Note from './models/Note.js';

import cors from 'cors';

const app = express();
const port = 3000;

/*==================	express midlleware function	================*/
app.use(cors());
app.use(express.json());

/*==================	API endpoints	================*/

app.get('/notes', async (req, res) => {
	const notes = await Note.find(); //accedo a la coleccion de la mmisma manera que model(por mas que la coleccion se llame notes)
	res.json(notes);
});

app.post('/notes', async (req, res) => {
	//se crea una nueva instancia del objeto definido en el modelo Note.js

	const newNote = new Note({
		title: req.body.title,
	});

	//almacena la respuesta en una variable y la guarda en la db
	const createdNote = await newNote.save();

	//devuelve la nota creada pero en formato json
	res.json(createdNote);
});

/*==================	API endpoints	================*/

//coneccion con DB
mongoose.connect(process.env.MONGO_URL).then(() => {
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
});

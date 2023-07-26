import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const NoteSchema = new Schema({
	title: String,
});

const NoteModel = mongoose.model('Note', NoteSchema); //esto me permite acceder al modelo mas info en la doc.

export default NoteModel;

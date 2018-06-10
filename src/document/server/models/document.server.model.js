import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const DocumentSchema = new Schema({
  language: String,
  version: String,
  text: String,
  obsolete: Boolean
});

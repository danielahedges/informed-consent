import mongoose from 'mongoose';
import { DocumentSchema } from './document.server.model';

const Schema = mongoose.Schema;

const AgreementSchema = new Schema({
  name: String,
  documents: [DocumentSchema]
});

mongoose.model('Agreement', AgreementSchema);

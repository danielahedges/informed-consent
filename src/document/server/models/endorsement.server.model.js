import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EndorsementSchema = new Schema({
  signor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  agreement: {
    type: Schema.Types.ObjectId,
    ref: 'Agreement'
  },
  version: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  payload: {
    type: String,
    required: true
  },
  signature: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

mongoose.model('Endorsement', EndorsementSchema);

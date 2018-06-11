import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SigRequestSchema = new Schema({
  requestor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  requestee: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  agreement: {
    type: Schema.Types.ObjectId,
    ref: 'Agreement'
  }
});

mongoose.model('SigRequest', SigRequestSchema);


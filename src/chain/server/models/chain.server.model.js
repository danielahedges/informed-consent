import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ChainSchema = new Schema({
  entry_hash: {
    type: String,
    unique: true,
    required: true
  },
  chain_id: {
    type: String,
    unique: true,
    required: true
  },
  external_ids: [String],
  content: String
});

mongoose.model('Chain', ChainSchema);

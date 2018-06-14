import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const KeypairSchema = new Schema({
  public: {
    type: String,
    required: true,
    index: true
  },
  private: {
    type: String,
    required: true
  }
});

mongoose.model('Keypair', KeypairSchema);

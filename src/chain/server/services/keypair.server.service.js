import keypair from 'keypair';
import mongoose from 'mongoose';

var Keypair;

export class KeypairService {
  static init() {
    Keypair = mongoose.model('Keypair');
  }
  static generate() {
    return keypair();
  }
  static getUserKeyPair(user) {
    const publicKey = user.publicKey;
    if (!publicKey) {
      throw new Error('missing public key');
    }
    return Keypair.findOne({ public: publicKey }).exec();
  }
  static saveKeyPair() {
    var keypair = new Keypair(KeypairService.generate());
    return keypair.save().then(kp => kp.public); // return only the public key as a string.
  }
}

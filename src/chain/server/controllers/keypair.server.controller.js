import { KeypairService } from '../services/keypair.server.service';

export class KeypairController {
  static init() {}
  static getMyPrivateKey(req, res) {
    KeypairService.getUserKeyPair(req.user)
      .then(pair => {
        return res.json(pair);
      })
      .catch(() => {
        return res
          .status(500)
          .send({ message: 'could not retrieve private key' });
      });
  }
}

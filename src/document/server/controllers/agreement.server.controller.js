import mongoose from 'mongoose';

var Agreement;

export class AgreementController {
  static init() {
    Agreement = mongoose.model('Agreement');
  }
  static list(req, res) {
    Agreement.find({}, { name: true }, (err, agreements) => {
      if (err) {
        return res.status(500).send({ message: 'could not load agreements' });
      }
      return res.json(agreements);
    });
  }
  static create(req, res) {
    var agreement = new Agreement(req.body);
    agreement.save(err => {
      if (err) {
        return res.status(500).send({ message: 'could not create agreement' });
      }
      return res.json(agreement);
    });
  }
  static read(req, res) {
    return res.json(req.agreement);
  }
  static update(req, res) {
    Object.assign(req.agreement, req.body);
    req.agreement.save(err => {
      if (err) {
        return res.status(500).send({ message: 'could not save agreement' });
      }
      return res.json(req.agreement);
    });
  }
  static agreementById(req, res, next, id) {
    Agreement.findById(id, (err, agreement) => {
      if (err) {
        return next(err);
      }
      if (!agreement) {
        return next(new Error('Failed to load agreement ' + id));
      }
      req.agreement = agreement;
      next();
    });
  }
}

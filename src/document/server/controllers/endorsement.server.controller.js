import mongoose from 'mongoose';
import _ from 'lodash';

var Endorsement, Agreement;

export class EndorsementController {
  static init() {
    Endorsement = mongoose.model('Endorsement');
    Agreement = mongoose.model('Agreement');
  }
  static getAllAgreementsById(ids, agreementMask) {
    var query = {};
    if (ids) {
      query._id = {
        $in: ids
      };
    }
    return Agreement.find(query, agreementMask)
      .exec()
      .then(agreements => {
        var agreementsById = {};
        _.each(agreements, agreement => {
          agreementsById[agreement._id] = agreement;
        });
        return agreementsById;
      });
  }
  static replaceAgreementIds(endorsements, agreementMask) {
    return EndorsementController.getAllAgreementsById(
      _.map(endorsements, endorsement => endorsement.agreement),
      agreementMask
    ).then(agreements => {
      var agreementsById = {};
      _.each(agreements, agreement => {
        agreementsById[agreement._id] = agreement;
      });
      return _.map(endorsements, endorsement =>
        Object.assign(endorsement, {
          agreement: agreementsById[endorsement.agreement]
        })
      );
    });
  }
  static listMyEndorsements(req, res) {
    Endorsement.find(
      {
        signor: req.user._id
      },
      {
        agreement: true,
        date: true
      }
    )
      .exec()
      .then(endorsements => {
        return EndorsementController.replaceAgreementIds(endorsements, {
          name: true
        })
          .then(returnEndorsements => {
            return res.json(returnEndorsements);
          })
          .catch(() => {
            return res
              .status(400)
              .send({ message: 'could not list endorsements' });
          });
      });
  }
  static create(req, res) {
    var endorsement = new Endorsement({
      signor: req.user._id,
      agreement: req.body.agreement,
      version: req.body.version,
      language: req.body.language,
      payload: req.body.payload,
      signature: req.body.signature,
      date: req.body.date
    });
    endorsement
      .save()
      .then(() => {
        return res.json(endorsement);
      })
      .catch(() => {
        return res
          .status(400)
          .send({ message: 'could not create endorsement' });
      });
  }
  static read(req, res) {
    EndorsementController.replaceAgreementIds([req.endorsement])
      .then(endorsements => {
        if (endorsements.length !== 1) {
          throw new Error('unexpected result');
        }
        res.json(endorsements[0]);
      })
      .catch(() => {
        res.status(400).send({ message: 'could not read endorsement' });
      });
  }
  static endorsementById(req, res, next, id) {
    Endorsement.findById(id)
      .then(endorsement => {
        req.endorsement = endorsement;
        next();
      })
      .catch(err => {
        return next(err);
      });
  }
  static userHasReadPermission(req, res, next) {
    // A user has access to all her own signatures.
    // But shouldn't a requestor or auditor also have access to some?
    // For right now, everyone can access all signatures.
    if (req.endorsement.signor === req.user._id) {
      return next();
    }
    return next();
  }
}

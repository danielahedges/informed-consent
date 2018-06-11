import mongoose from 'mongoose';

var SigRequest;

export class SigRequestController {
  static init() {
    SigRequest = mongoose.model('SigRequest');
  }
  static list(req, res) {
    SigRequest.find(
      {
        $or: [
          {
            requestor: req.user._id
          },
          {
            requestee: req.user._id
          }
        ]
      },
      (err, sigRequests) => {
        if (err) {
          return res
            .status(500)
            .send({ message: 'could not load sigRequests' });
        }
        return res.json(sigRequests);
      }
    );
  }
  static create(req, res) {
    var sigRequest = new SigRequest({
      requestor: mongoose.Types.ObjectId(req.user._id),
      requestee: mongoose.Types.ObjectId(req.body.requestee),
      agreement: mongoose.Types.ObjectId(req.body.agreement)
    });
    sigRequest.save(err => {
      if (err) {
        return res.status(500).send({ message: 'could not create request' });
      }
      return res.json(sigRequest);
    });
  }
  static read(req, res) {
    return res.json(req.sigRequest);
  }
  static update(req, res) {
    Object.assign(req.sigRequest, {
      requestor: mongoose.Types.ObjectId(req.user._id),
      requestee: mongoose.Types.ObjectId(req.body.requestee),
      agreement: mongoose.Types.ObjectId(req.body.agreement)
    });
    req.sigRequest.save(err => {
      if (err) {
        return res.status(500).send({ message: 'could not save request' });
      }
      return res.json(req.sigRequest);
    });
  }
  static delete(req, res) {
    req.sigRequest.remove(err => {
      if (err) {
        return res.status(500).send({ message: 'could not delete' });
      }
      return res.json(req.sigRequest);
    });
  }
  static sigRequestById(req, res, next, id) {
    SigRequest.findById(id, (err, sigRequest) => {
      if (err) {
        return next(err);
      }
      if (!sigRequest) {
        return next(new Error('Failed to load sigRequest ' + id));
      }
      req.sigRequest = sigRequest;
      next();
    });
  }
  static userHasReadPermission(req, res, next) {
    // this is pretty complicated. Should be role-based.
    // For now, let's just say users only have read access to the
    // requests for or from them.
    if (
      req.sigRequest.requestor._id === req.user._id ||
      req.sigRequest.requestee._id === req.user._id
    ) {
      return next();
    }
    return next(new Error('User does not have permision'));
  }
}

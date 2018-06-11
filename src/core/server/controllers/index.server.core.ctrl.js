import { CONFIG } from '../config/config';

export class IndexController {
  static render(req, res) {
    var user = null;
    if (req.user) {
      user = {
        _id: '' + req.user._id + '',
        username: req.user.username
      };
    }
    res.render('index', {
      title: 'Informed Consent',
      username: req.user ? req.user.username : null,
      user: JSON.stringify(user),
      auth: {
        google: CONFIG.google.enabled,
        twitter: CONFIG.twitter.enabled,
        facebook: CONFIG.facebook.enabled
      }
    });
  }
}

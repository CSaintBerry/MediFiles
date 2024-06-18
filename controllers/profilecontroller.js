const Profile = require('../models/profilemodel');

exports.getProfile = (req, res) => {
  const userId = req.params.id;

  Profile.getProfile(userId, (err, profile) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).send(profile);
    }
  });
};



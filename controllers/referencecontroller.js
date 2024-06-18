const Reference = require('../models/referencemodel');

exports.createReference = (req, res) => {
  const referenceData = req.body;

  Reference.createReference(referenceData, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(201).send({ message: 'Reference created successfully' });
    }
  });
};



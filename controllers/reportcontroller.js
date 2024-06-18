const Report = require('../models/reportmodel');

exports.generateReport = (req, res) => {
    const filters = req.body;

    Report.generateReport(filters, (err, report) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(200).send(report);
        }
    });
};

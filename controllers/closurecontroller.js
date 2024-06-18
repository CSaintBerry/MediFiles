const Queue = require('../models/closuremodel');

exports.getDailyClosure = (req, res) => {
    const today = new Date();
    const start = new Date(today.setHours(0, 0, 0, 0));
    const end = new Date(today.setHours(23, 59, 59, 999));

    Queue.getDailyQueue(start, end, (err, queue) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(200).send(queue);
        }
    });
};

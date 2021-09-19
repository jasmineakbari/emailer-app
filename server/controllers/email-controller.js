const { Email } = require('../models');

const emailController = {
    getAllEmails(req, res) {
        Email.find({})
        .then(dbEmailData => res.json(dbEmailData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    
    getEmailById({ params }, res) {
        Email.findOne({ _id: params.id })
        .then(dbEmaData => {
            if (!dbEmailData) {
            res.status(404).json({ message: 'No emails found with this id!' });
            return;
            }
            res.json(dbEmailData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    addEmail({ body }, res) {
        Email.create(body)
        .then(dbEmailData => res.json(dbEmailData))
        .catch(err => res.status(400).json(err));
    },

    updateEmail({ params, body }, res) {
        Email.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbEmailData => {
            if (!dbEmailData) {
            res.status(404).json({ message: 'No email found with this id!' });
            return;
            }
            res.json(dbEmailData);
        })
        .catch(err => res.status(400).json(err));
    },

    updateEmailGroup({}) {

    },

    deleteEmail({ params }, res) {
        Email.findOneAndDelete({ _id: params.id })
        .then(dbEmailData => {
            if (!dbEmailData) {
            res.status(404).json({ message: 'No email found with this id!' });
            return;
            }
            res.json(dbEmailData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = emailController;
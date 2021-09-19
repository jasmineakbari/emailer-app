const router = require('express').Router();
const {
    getAllEmails,
    getEmailById,
    addEmail,
    updateEmail,
    deleteEmail
} = require('../../controllers/email-controller');

router
  .route('/')
  .get(getAllEmails)
  .post(addEmail);

router
  .route('/:id')
  .get(getEmailById)
  .put(updateEmail)
  .delete(deleteEmail);

module.exports = router;
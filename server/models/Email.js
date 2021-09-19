const { Schema, model, Types } = require('mongoose');

const EmailSchema = new Schema({
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    email: {
      type: String,
        trim: true,
        unique: true,
        validate: {
          validator: function(v) {
              return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
          },
          message: "Please enter a valid email"
        },
      required: [true, "Email required"]
    }
});

const Email = model('Email', EmailSchema);

module.exports = Email;
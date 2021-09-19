const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const groupSchema = require('./Group');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    password: {
        type: String,
        required: true,
    },
    user_email: {
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
    },
    savedEmailGroups: [groupSchema]
    },
    {
      toJSON: {
        getters: true,
        virtuals: true
      }
    }
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);

module.exports = User;
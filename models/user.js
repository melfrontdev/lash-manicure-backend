// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  senha: { type: String, required: true },
  cep: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: String, required: true },
  neighborhood: { type: String, required: true },
  reference: { type: String, required: false },
  city: { type: String, required: true },
});

// Pre-save hook to hash the password
userSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.senha);
};

module.exports = mongoose.model('User', userSchema);

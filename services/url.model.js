const mongoose = require('mongoose');

// Definir el esquema y modelo para las URLs
  //Schema — the schema we have created just now
  //Model - so a collection will be created with a name (plural form of the name with all lowercase)
  const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date }
  });
  
  const Url = mongoose.model('Url', urlSchema);

  module.exports = Url;
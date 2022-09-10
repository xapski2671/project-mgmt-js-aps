const mongoose = require("mongoose")

const ClientSchema = new mongoose.Schema({
  // ids are made by default
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
})

module.exports = mongoose.model("Client", ClientSchema)
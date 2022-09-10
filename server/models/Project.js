const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
  // ids are made by default
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"] //the only options we can have
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId, //client object id
    ref: "Client" // will use client id
  }
})

module.exports = mongoose.model("Project", ProjectSchema)
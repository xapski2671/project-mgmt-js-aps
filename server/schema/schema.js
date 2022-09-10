const { gql } = require("apollo-server")
const { Project, Client } = require("../models/exportModels")

const typeDefs = gql`
  type Client {
    id: ID!
    name: String
    email: String
    phone: String
  }

  type Project {
    id: ID!
    name: String
    description: String
    status: String
    client: Client
  }


  type Query {
    projects: [Project]
    project(id: ID!): Project
    clients: [Client]
    client(id: ID!): Client
  }


  type Mutation {
    addClient(name: String!, email: String!, phone: String!): Client
    deleteClient(id: ID!): Client
    updateClient(id: ID!, name: String, email: String, phone: String): Client
    addProject(name: String!, description: String!, status: ProjectStatus = PENDING, clientId: ID!): Project
    deleteProject(id: ID!): Project
    updateProject(id: ID!, name: String, description: String, status: ProjectStatusUpdate, clientId: ID): Project
  }

  enum ProjectStatus {
    PENDING
    INPROGRESS
    COMPLETED
  }

  enum ProjectStatusUpdate {
    PENDING
    INPROGRESS
    COMPLETED
  }
`

const resolvers = 
{
  Project: {
    client: async (parent, args)=>{
      return Client.findById(parent.clientId)
    }
  },

  ProjectStatus: {
    PENDING: "Pending",
    INPROGRESS: "In Progress",
    COMPLETED: "Completed",
  },

  ProjectStatusUpdate: {
    PENDING: "Pending",
    INPROGRESS: "In Progress",
    COMPLETED: "Completed",
  },

  Query: {
    projects: async (parent, args)=>{return await Project.find()},
    project: async (parent, args)=>{return await Project.findById(args.id)},
    clients: async (parent, args)=>{return await Client.find()},
    client: async (parent, args)=>{return await Client.findById(args.id)},
  },

  Mutation: {
    addClient: async (parent, args)=>{
      const client = new Client({
        name: args.name,
        email: args.email,
        phone: args.phone
      })
      return await client.save()
    },

    deleteClient: async(parent, args)=>{
      return await Client.findByIdAndRemove(args.id)
    },

    updateClient: async(parent, args)=>{
      return await Client.findByIdAndUpdate(
        args.id,

        {
          $set: {
            name: args.name,
            email: args.email,
            phone: args.phone,
          }
        },

        { new: true }
      )
    },

    addProject: async(parent, args)=>{
      const project = new Project({
        name: args.name,
        description: args.description,
        status: args.status,
        clientId: args.clientId,
      })
      return await project.save()
    },

    deleteProject: async(parent, args)=>{
      return await Project.findByIdAndRemove(args.id)
    },

    updateProject: async(parent, args)=>{
      return await Project.findByIdAndUpdate(
        args.id,

        {
          $set: {
            name: args.name,
            description: args.description,
            status: args.status,
            clientId: args.clientId,
          }
        },

        { new: true }
      )
    },
  }
}

module.exports = { typeDefs, resolvers }
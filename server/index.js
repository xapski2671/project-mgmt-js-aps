const { ApolloServer } = require("apollo-server")
const { connectDB } = require("./config/db")
const { typeDefs, resolvers } = require("./schema/schema")
const colors = require("colors")
require("dotenv").config()

const port = process.env.PORT || 2000

const app = new ApolloServer({ typeDefs, resolvers })

connectDB()

app.listen({ port }).then(({ url })=>{console.log(`server initialized at ${url}`)})
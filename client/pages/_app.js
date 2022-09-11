import Head from "next/head"
import Script from "next/script"
import Layout from "../layout/layout"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {

  const cache = new InMemoryCache({
    // for any updates to the cache
    typePolicies: {
      Query: {
        fields: {
          clients: {
            merge(existing, incoming){return incoming}
          },
          projects: {
            merge(existing, incoming){return incoming}
          }
        }
      }
    }
  })

  const client = new ApolloClient({
    uri: "https://project-mgmt-js.onrender.com/graphql",
    cache: cache
  })

  return (
    <>
      <Head>    
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  )
}

export default MyApp

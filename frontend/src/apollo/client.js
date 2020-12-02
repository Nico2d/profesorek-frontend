import { ApolloClient, InMemoryCache } from "@apollo/client"
import fetch from "isomorphic-fetch"

export const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
  fetch,
})

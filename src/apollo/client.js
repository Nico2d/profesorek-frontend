import { ApolloClient, InMemoryCache } from "@apollo/client"
import fetch from "isomorphic-fetch"

export const client = new ApolloClient({
  uri: "https://co-tam-profesorku-backend.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  fetch,
})

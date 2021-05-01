import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";
//remember token
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN))); //for storing local state outside of the Apollo Client cache.
export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token); //(keyname, keyValue)
  isLoggedInVar(true);
};
export const logUserOut = () => {
  localStorage.removeItem(TOKEN); //(keyname, keyValue)
  isLoggedInVar(false);
};

export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

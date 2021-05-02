import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";
const DARK_MODE = "DARK_MODE";
//remember token
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN))); //for storing local state outside of the Apollo Client cache.
//login to server
export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token); //(keyname, keyValue)
  isLoggedInVar(true);
};
//log out to server
export const logUserOut = (history) => {
  localStorage.removeItem(TOKEN); //(keyname, keyValue)
  isLoggedInVar(false);
  history.replace();
  window.location.reload();
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

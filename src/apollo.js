import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";
//remember token
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN))); //for storing local state outside of the Apollo Client cache.
//login to server
export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
//log out to server
export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
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

// const httpLink = createHttpLink({
//   uri: "http://localhost:4000/graphql",
// });
const uplaodHttpLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://heestaclone-backend.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
});
const authLink = setContext((_, { headers }) => {
  // put the token into headers context
  return {
    headers: {
      ...headers, //previous header
      token: localStorage.getItem(TOKEN),
    },
  };
});
const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`Graph`, graphQLErrors);
  }
  if (networkError) {
    console.log(`net`, networkError);
  }
});
export const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uplaodHttpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.userName}`,
      },
    },
  }),
});

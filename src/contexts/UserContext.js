import { createContext } from 'react';

export const UserContext = createContext({
  loggedIn: 'NOT_LOGGED_IN', user: {}
});
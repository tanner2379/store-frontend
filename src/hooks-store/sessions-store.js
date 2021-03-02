import { initStore } from './store';

const configureStore = () => {
  let status = {
    loggedIn: 'NOT_LOGGED_IN',
    currentUser: null
  }

  const actions = {
    HANDLE_LOGIN: (curState, user) => {
      console.log("logging in");
      status = {
        loggedIn: 'LOGGED_IN',
        currentUser: user
      };

      return status;
    },
    HANDLE_LOGOUT: () => {
      status = {
        loggedIn: 'NOT_LOGGED_IN',
        currentUser: null
      };
      return status;
    }
  };
  initStore(actions, status);
};

export default configureStore;
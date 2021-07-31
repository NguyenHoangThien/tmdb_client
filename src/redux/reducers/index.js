import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default history => {
  const appReducer = combineReducers({
    router: connectRouter(history),
    loadingBar: loadingBarReducer
  });

  // reset the state of a redux store
  const rootReducer = (state, action) => {
    if (action.type === '@@common/RESET_REDUCER' && action.payload) {
      state[action.payload] = undefined;
    }
    return appReducer(state, action);
  };

  return rootReducer;
};

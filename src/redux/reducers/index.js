import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

export default history => {
  const appReducer = combineReducers({
    router: connectRouter(history)
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

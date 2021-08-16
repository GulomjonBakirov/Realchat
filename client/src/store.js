import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from "./reducers/userReducer";
import { getAllChatrooms } from "./reducers/chatroomReducer";

const reducer = combineReducers({
  auth: authReducer,
  allChatroom: getAllChatrooms,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

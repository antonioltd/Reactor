import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-from";
export default combineReducers({
  auth: authReducer,
  from: formReducer
});

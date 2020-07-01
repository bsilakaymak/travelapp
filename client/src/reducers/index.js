import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import boards from './boards';
import places from './places';
import user from './user';
import users from './users';
export default combineReducers({
  alert,
  auth,
  boards,
  places,
  user,
  users,
});
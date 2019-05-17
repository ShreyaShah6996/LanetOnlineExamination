import { combineReducers } from 'redux';

import auth from './authReducer';
import tech from './techReducer';
import user from './userReducer';
import college from './collegeReducer';
import test from './testReducer';
import testQuestion from './testQuestionReducer';
import question from './queReducer';

export default combineReducers({ auth, tech, user, college, test, testQuestion, question });
import { combineReducers } from 'redux'
import githubReducer from './gitHubReducer';

export default combineReducers({
auth: githubReducer
})

import {combineReducers} from 'redux';
import {getAllContacts} from './fetchapi';
import {getUsContacts,changeSearchValue,getSearchContacts} from './fetchapi'

const reducers = combineReducers({getAllContacts, usContact: getUsContacts,searchValue:changeSearchValue,searchList:getSearchContacts});
export default reducers;

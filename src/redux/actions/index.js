import axios from "axios";
import {configAllContacts} from "../../constants/constants";
import {configUSContacts} from "../../constants/constants";

export const contacts = (pageNumber) => async (dispatch) => {
    let _config = {...configAllContacts, url: configAllContacts.url + "&page=" + pageNumber};
    return axios(_config)
        .then((response) => response.data)
        .then((data) => dispatch({type: 'LIST_CONTACTS', payload: data}));
};

export const usContacts = (pageNumber) => async (dispatch) => {
    let _config = {...configUSContacts, url: configUSContacts.url + "&page=" + pageNumber};
    return axios(_config)
        .then((response) => response.data)
        .then((data) => dispatch({type: 'LIST_US', payload: data}));
};

export const searchContacts = (config) => async (dispatch) => {
    return axios(config)
        .then((response) => response.data)
        .then((data) => dispatch({type: 'SEARCH_LIST', payload: data}));
};


export const searchValue = (value) => {
    return {
        type: 'SEARCH',
        payload: value
    }
}


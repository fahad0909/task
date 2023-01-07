const initState = {
    list: {},
};
const initialList = {
    usList: {},
}
const intialSearchList={
    searchList:{},
}

const searchValue = "";
export const getAllContacts = (state = initState, action) => {
    if (action.type === 'LIST_CONTACTS') {
        return {list: action.payload};
    } else {
        return state;
    }
};

export const getUsContacts = (state = initialList, action) => {
    if (action.type === 'LIST_US') {
        return {usList: action.payload};
    } else {
        return state;
    }
}
export const getSearchContacts = (state = intialSearchList, action) => {
    if (action.type === 'SEARCH_LIST') {
        return {searchList: action.payload};
    } else {
        return state;
    }
}




export const changeSearchValue = (state = searchValue, action) => {

    if (action.type === 'SEARCH') {
        console.log(action.payload);
        return action.payload;
    } else {
        return state;
    }


}


//
// export const setSingleId=()=>{
//
// }




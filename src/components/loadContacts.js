import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {contacts, usContacts} from "../redux/actions";

const LoadContacts = (pageNumber, header) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [contactList, setContactList] = useState({});

    const dispatch = useDispatch();
    const _allContacts = useSelector(state => state.getAllContacts);
    const _usContacts = useSelector(state => state.usContact);

    useEffect(() => {
        if (header === "All") {
            if (_allContacts.list.hasOwnProperty("contacts_ids")) {
                setContactList(_allContacts.list.contacts);
                setLoading(false);
            } else {
                dispatch(contacts(pageNumber)).then(result => {
                    setContactList(result.payload.contacts);
                    setLoading(false);
                });
            }
        } else if (header === "US") {
            if (_usContacts.usList.hasOwnProperty("contacts_ids")) {
                setContactList(_usContacts.usList.contacts);
                setLoading(false);
            } else {
                dispatch(usContacts(pageNumber)).then(result => {
                    setContactList(result.payload.contacts);
                    setLoading(false);
                });
            }
        }
    }, []);

    useEffect(() => {
        setHasMore(true);
        setError(false)
        if (header === "All") {
            dispatch(contacts(pageNumber)).then(result => {
                setContactList({...contactList, ...result.payload.contacts});
                setHasMore(false);
            });
        } else if (header === "US") {
            dispatch(usContacts(pageNumber)).then(result => {
                setContactList({...contactList, ...result.payload.contacts});
                setHasMore(false);
            });
        }
    }, [pageNumber])
    return {loading, setLoading, error, hasMore, contactList, setContactList, _usContacts, _allContacts}
};

export default LoadContacts;
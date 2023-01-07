import React, {useState, useRef, useCallback, useEffect} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {searchValue, searchContacts} from "../redux/actions";
import DetailModal from "./detailModal";
import {searchConfig} from "../constants/constants";
import loadContacts from "./loadContacts";

const ListModal = (props) => {
    const [openDetail, setOpenDetail] = useState(false);
    const [detailContact, setDetailContact] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [check, setCheck] = useState(true);
    const dispatch = useDispatch();
    const _searchValue = useSelector(state => state.searchValue);
    const observer = useRef();
    const _debouncedSearch = useRef(null);
    const {
        contactList,
        setContactList,
        hasMore,
        _usContacts,
        _allContacts,
        loading,
        setLoading,
    } = loadContacts(pageNumber, props.header)

    useEffect(() => {
        if (!check) {
            if (_debouncedSearch.current) {
                clearTimeout(_debouncedSearch.current);
            }
            _debouncedSearch.current = setTimeout(() => {
                _searchContacts();
            }, 3000);
        } else setCheck(false);
    }, [_searchValue]);
    const lastContact = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    const clickedItem = (_item) => {
        setDetailContact(_item);
        setOpenDetail(true);
    }
    const toggle = () => {
        setOpenDetail(!openDetail);
    }

    const handleChange = (e) => {
        if (e.target.checked) {
            let ids = Object.keys(contactList).filter(id => id % 2 === 0);
            const newObject = ids.reduce((acc, key) => {
                acc[key] = contactList[key];
                return acc;
            }, {});
            setContactList(newObject);
        } else {
            if (props.header === "All") {
                setContactList(_allContacts.list.contacts);
            } else if (props.header === "US") {
                setContactList(_usContacts.usList.contacts);
            }
        }
    }

    const handleSearchChange = (event) => {
        setPageNumber(1);
        dispatch(searchValue(event.target.value));
        // debouncedSearch();
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            _searchContacts();
        }
    }

    const _searchContacts = () => {
        if (_searchValue !== "") {
            setLoading(true);
            if (props.header === "All") {
                let _config = {...searchConfig, url: searchConfig.url + "&query=" + _searchValue};
                dispatch(searchContacts(_config)).then(result => {
                    setContactList(result.payload.contacts);
                    setLoading(false);
                });
            } else if (props.header === "US") {
                let _config = {
                    ...searchConfig,
                    url: searchConfig.url + "&countryId=226" + "&query=" + _searchValue
                };
                dispatch(searchContacts(_config)).then(result => {
                    setContactList(result.payload.contacts);
                    setLoading(false);
                });
            }
        } else {
            if (props.header === "All") {
                setContactList(_allContacts.list.contacts);
                setLoading(false);
            } else if (props.header === "US") {
                setContactList(_usContacts.usList.contacts);
                setLoading(false);
            }
        }
    }

    return (
        <div>
            <Modal isOpen={true} centered={true}>
                <ModalHeader>
                    <div>
                        {props.header} Contacts
                        <input className="mx-5" type="text" id="search" onChange={handleSearchChange}
                               onKeyPress={handleKeyPress}/>
                    </div>
                </ModalHeader>
                <ModalBody>{loading ? <div className="text-center w-100 py-5 my-5">
                    <div className="spinner-border spinner-border-lg" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> : <>
                    <div className="d-flex justify-content-around">
                        <div>
                            <Link to="/allContacts"><Button className="buttonA">All Contacts</Button></Link>
                        </div>
                        <div>
                            <Link to="/usContacts"><Button className="buttonB">US Contacts</Button></Link>
                        </div>
                        <div>
                            <Link to="/"><Button className="buttonC">Close</Button></Link>
                        </div>
                    </div>
                    <div className="list">
                        {contactList ? Object.keys(contactList).map((item, index) => {
                            if (Object.keys(contactList).length === index + 1) {
                                return (
                                    <div key={item} ref={lastContact}>
                                        <div onClick={() => clickedItem(contactList[item])} role="button" className="listItems my-2 rounded">
                                            <div>
                                                <div className="d-flex justify-content-between">
                                                    <label className="ml-3">Email</label>
                                                    <label className="mr-3">{contactList[item].email}</label>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <label className="ml-3">ID</label>
                                                    <label className="mr-3">{item}</label>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <label className="ml-3">Name</label>
                                                    <label className="mr-3">{contactList[item].first_name}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={item}>
                                        <div onClick={() => clickedItem(contactList[item])} role="button" className="listItems my-2 rounded">
                                            <div>
                                                <div className="d-flex justify-content-between">
                                                    <label className="ml-3">Email</label>
                                                    <label className="mr-3">{contactList[item].email}</label>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <label className="ml-3">ID</label>
                                                    <label className="mr-3">{item}</label>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <label className="ml-3">Name</label>
                                                    <label className="mr-3">{contactList[item].first_name}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }) : "No data"}
                        <div>{hasMore && 'Loading...'}</div>
                    </div>
                </>}
                </ModalBody>
                <ModalFooter className="justify-content-start">
                    <label>Only even</label>
                    <input type="checkbox" onChange={(e) => handleChange(e)}/>
                </ModalFooter>
            </Modal>
            <DetailModal isOpen={openDetail} toggle={toggle} item={detailContact}/>
        </div>
    );
};

export default ListModal;
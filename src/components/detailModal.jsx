import React from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";

const DetailModal = (props) => {
    return (
        <div>
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader>
                    Contact Details
                </ModalHeader>
                <ModalBody>
                    <div >
                        <div>
                            <label>Email </label>
                            <span> {props.item.email}</span>
                        </div>
                        <div>
                            <label>Name </label>
                            <span> {props.item.first_name}</span>
                        </div>
                        <div>
                            <label>Address </label>
                            <span> {props.item.address}</span>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default DetailModal;
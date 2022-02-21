/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

const Modals = (props) => {
    const {
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader
                    style={{
                        backgroundColor: '#041417',
                        color: 'white',
                        border: "white solid 1px",
                    }}>
                    Help with MetaMask</ModalHeader>
                <ModalBody
                    style={{
                        backgroundColor: '#041417',
                        color: 'white',
                        border: "white solid 1px",
                    }}>
                    1. Connect your Metamask to this webpage and you'll be prompted to connect to Aurora testnet.
                    <p />
                    2. Import this token to the Aurora Testnet:
                    <br />
                    0x42cD5De0ba1a8c05d9C79726db57bAeBCF0915Af
                    <p />
                    3. Input the address and grab some tokens.
                </ModalBody>
            </Modal>
            <Button
                onClick={toggle}
                style={{
                    color: "black",
                    fontSize: "24px",
                    fontWeight: "bold",
                    backgroundColor: "red",
                    borderRadius: "25px",
                }}
            >
                <div style={{
                    paddingBottom: "2px",
                }}>
                    HELP
                </div>
            </Button>
        </div>
    );
}

export default Modals;
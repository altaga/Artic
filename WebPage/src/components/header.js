import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import autoBind from 'react-autobind';
import logo from '../assets/logo.png';
import "../assets/main.css";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pubkey: "",
        }
        autoBind(this);
    }


    componentDidMount() {
        if (typeof window.ethereum !== 'undefined' && window.ethereum.isConnected()){
            console.log("Connected");
        }
    }

    async enableEthereum() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x4E454153' }],
                });
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                this.setState({
                    pubkey: account,
                }, () => {
                    window.ethereum.on('accountsChanged', (accounts) => {
                        const account = accounts[0];
                        console.log("Change:" + account);
                        this.setState({
                            pubkey: account,
                        });
                    });
                });
            } catch (switchError) {
                console.log(switchError);
                if (switchError.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0x4E454153',
                                    chainName: 'Aurora Testnet',
                                    rpcUrls: ['https://testnet.aurora.dev/'],
                                    blockExplorerUrls: ['https://explorer.testnet.aurora.dev/'],
                                    nativeCurrency: {
                                        name: 'Ether',
                                        symbol: "ETH",
                                        decimals: 18,
                                    }
                                },
                            ],
                        });
                        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                        const account = accounts[0];
                        this.setState({
                            pubkey: account,
                        }, () => {
                            window.ethereum.on('accountsChanged', (accounts) => {
                                const account = accounts[0];
                                console.log("Change:" + account);
                                this.setState({
                                    pubkey: account,
                                });
                            });
                        });
                    } catch (addError) {
                        // handle "add" error
                    }
                }
            }
        }
        else {
            alert("Please install MetaMask to use this feature.")
            window.open("https://metamask.io/", "_blank");
        }
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div style={{
                width: "100vw",
                height: "8vh",
                backgroundColor: '#0d2b32',
                color: "white",
                padding: "1vh",
                fontSize: "20px",
                position: "fixed",
                top: "0",
                textAlign: "center",
            }}>
                <Row md="13">
                    <Col>
                    </Col>
                    <Col>
                        <a href="/">
                            <img alt="logo" src={logo} width="100px" />
                        </a>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                        <a href="https://aurora.dev/about"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}>
                            About
                        </a>
                    </Col>
                    |
                    <Col>
                        <a href="https://aurora.dev/ecosystem"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}>
                            Ecosystem
                        </a>
                    </Col>
                    |
                    <Col>
                        <a href="/demo"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}>
                            AI Service
                        </a>
                    </Col>
                    |
                    <Col>
                        <a href="/faucet"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}>
                            TIC Faucet
                        </a>
                    </Col>
                    |
                    <Col>
                        <a href="https://github.com/altaga/Artic"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}>
                            Github
                        </a>
                    </Col>
                    {
                        this.state.pubkey !== "" &&
                        <>
                            |
                            <Col>
                                <a href="/payment" style={{
                                    color: "white",
                                    textDecoration: "none",
                                }}>
                                    Pay
                                </a>
                            </Col>
                        </>
                    }
                    <Col>
                    </Col>
                    <Col>
                        <Button onClick={() => this.enableEthereum()} style={{ width: "200px", borderRadius: "25px", fontSize: "1.2rem", fontWeight: "bold", backgroundColor: "#4CAF50", color: "black" }}>
                            {
                                this.state.pubkey !== "" ?
                                    "Connected"
                                    :
                                    "Connect Wallet"
                            }</Button>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Header;
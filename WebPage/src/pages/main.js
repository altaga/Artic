// Basic imports
import '../assets/main.css';
import { Component } from 'react';

// Frontend Components
import { CardBody, CardHeader, Col, Row, Button } from 'reactstrap';

// Assets
import { FaDiscord } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import logoFooter from '../assets/logofooter.png';

// Utils
import autoBind from 'react-autobind';

// Web3 imports
import Web3 from 'web3';
import { abi } from '../contracts/contractOracle.js';
import { abi as abi2 } from '../contracts/contractToken.js';

const web3 = new Web3(new Web3.providers.HttpProvider('https://testnet.aurora.dev'));

// The Aurora address of the smart contract
const oracleFPS = "0xe66dAee629345eD9F231CC5C87B68EbCD1E69aA9";
const faucetToken = "0x42cD5De0ba1a8c05d9C79726db57bAeBCF0915Af";

// Setup Contract object based on the ABI
const ContractO = new web3.eth.Contract(abi(), oracleFPS);
const ContractT = new web3.eth.Contract(abi2(), faucetToken);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValues: [],
      textValues: [" FPS", " Nodes", " Transaction cost"],
    };
    autoBind(this);
    this.updateInterval = null;
  }

  async updateValues() {
    let result = [];
    result[0] = await ContractO.methods.latestAnswer().call() / 1e6;
    result[1] = 2;
    result[2] = "~$0.02"
    this.setState({
      displayValues: result
    });
  }

  async componentDidMount() {
    this.updateValues();
    this.updateInterval = setInterval(async () => {
      this.updateValues();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    return (
      <div className="App example" style={{
        backgroundColor: '#041417',
      }}>
        <div className="imageBack">
          <div style={{
            margin: "30px"
          }}>
            <div className="center2">
              <h1 className="hmod" style={{
                width: "50vw",
                paddingTop: "16vh",
                WebkitTextStrokeWidth: "1px",
              }}>
                DeAI: Decentralized <br /> AI infrastructure
              </h1>
            </div>
            <div className="center2">
              <div style={{
                width: "40vw",
                color: "white",
                fontSize: "24px",
                paddingTop: "2vh",
              }}>
                Arctic provides Decentralized Computer Vision     <br />
                services and a node infrastructure where you can  <br />
                mine by providing AI services to the Network.
              </div>
            </div>
            <div className="center2">
              <div style={{
                width: "40vw",
                color: "white",
                fontSize: "16px",
                paddingTop: "6vh"
              }}>
                <Row>
                  {
                    this.state.displayValues.map((value, index) => {
                      return (
                        <Col className="valuesMod" key={"Col" + index} xs="4">
                          {
                            value
                          }
                          <br />
                          {
                            this.state.textValues[index]
                          }
                        </Col>
                      )
                    })
                  }
                </Row>
              </div>
            </div>
            <div style={{ marginTop: "6vh" }} />
            <div className="center2">
              <div style={{
                width: "40vw",
                color: "white",
                fontSize: "24px"
              }}>
                <Row>
                  <Col xs="6">
                    <Button style={{
                      color: "black",
                      fontSize: "24px",
                      fontWeight: "bold",
                      width: "200px",
                      backgroundColor: "white",
                      borderRadius: "25px",
                    }}
                      onClick={() => {
                        window.location.href = "/demo";
                      }}>
                      AI service
                    </Button>
                  </Col>
                  <Col xs="6">
                    <Button style={{
                      color: "black",
                      fontSize: "24px",
                      fontWeight: "bold",
                      width: "200px",
                      backgroundColor: "#4CAF50",
                      borderRadius: "25px",
                    }}
                      onClick={() => {
                        window.open("https://github.com/altaga/Artic", "_blank");
                      }}>
                      Mine
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          height: "100vh",
        }}>
          <div className="center3">
            <h5 style={{
              textAlign: "left",
              color: "white",
              fontSize: "1.6rem",
              paddingTop: "40px",
              paddingLeft: "200px",
              lineHeight: "2.6rem",
            }}>
              This Proof of Concept offers AI Computer <br />
              Vision Services through Flux Oracles and <br />
              mining capabilities via our Aurora-based TIC token.
            </h5>
          </div>
          <div style={{ marginTop: "6vh" }} />
          <div className="center2" style={{
          }}>
            <Row style={{
              width: "74vw",
            }}>
              <div className="flex-container">
                <div style={{
                  borderRadius: "15px 0px 0px 0px",
                  backgroundColor: "#041417",
                  color: "white",
                  width: "33vw",
                }}>
                  <CardHeader
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                      backgroundColor: "#4CAF50",
                      borderRadius: "10px"
                    }}>
                    Block Explorer
                  </CardHeader>
                  <CardBody style={{
                    fontSize: "1.3rem",
                  }}>
                    The most important information can be checked through the Aurora Explorer.
                  </CardBody>
                </div>
                <div style={{
                  backgroundColor: "#041417",
                  color: "white",
                  width: "33vw",
                }}>
                  <CardHeader
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                      backgroundColor: "#4CAF50",
                      borderRadius: "10px"
                    }}>
                    AI Oracles as a service
                  </CardHeader>
                  <CardBody style={{
                    fontSize: "1.3rem",
                  }}>
                    AI as a service through Flux oracles to fulfill your Computer vision needs.
                  </CardBody>
                </div>
                <div style={{
                  borderRadius: "0px 15px 0px 0px",
                  backgroundColor: "#041417",
                  color: "white",
                  width: "33vw",
                }}>
                  <CardHeader
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                      backgroundColor: "#4CAF50",
                      borderRadius: "10px"
                    }}>
                    Mine a Near-Aurora token
                  </CardHeader>
                  <CardBody style={{
                    fontSize: "1.3rem",
                  }}>
                    By providing computational power though the Jetson Nano and Flux you can earn Aurora-based TIC tokens
                  </CardBody>
                </div>
              </div>
            </Row>
          </div>
          <div className="center2">
            <Row style={{
              width: "74vw",
            }}>
              <div className="flex-container">
                <div style={{
                  borderRadius: "0px 0px 0px 15px",
                  backgroundColor: "#041417",
                  color: "white",
                  width: "33vw",
                }}>
                  <CardHeader
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                      backgroundColor: "#4CAF50",
                      borderRadius: "10px"
                    }}>
                    Interoperability
                  </CardHeader>
                  <CardBody style={{
                    fontSize: "1.3rem",
                  }}>
                    As we are based on the Aurora network we have full interoperability between the Near and ETH ecosystems.
                  </CardBody>
                </div>
                <div style={{
                  backgroundColor: "#041417",
                  color: "white",
                  width: "33vw",
                }}>
                  <CardHeader
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                      backgroundColor: "#4CAF50",
                      borderRadius: "10px"
                    }}>
                    Scalable
                  </CardHeader>
                  <CardBody style={{
                    fontSize: "1.3rem",
                  }}>
                    Scalability provided through NEAR sharding.
                  </CardBody>
                </div>
                <div style={{
                  borderRadius: "0px 0px 15px 0px",
                  backgroundColor: "#041417",
                  color: "white",
                  width: "33vw",
                }}>
                  <CardBody style={{
                    fontSize: "1.3rem",
                  }}>
                    <a href="https://aurora.dev/ecosystem" rel="noopener noreferrer" target="_blank"
                      style={{
                        textDecoration: "none",
                        color: "white",
                      }}
                    >
                      {"Full Ecosystem ->"}
                    </a>
                  </CardBody>
                </div>
              </div>
            </Row>
          </div>
        </div>
        <div className="imageBackFooter" />
        <div style={{
          marginTop: "-70vh"
        }}>
          <div className="center2">
            <div className="center4">
              <Col>
                <div className="center2">
                  <Row>
                    <button
                      onClick={() => {
                        window.open("https://discord.gg/43xaEUXWHw", "_blank");
                      }}
                      style={{
                        width: "82px",
                        height: "82px",
                        fontSize: "2rem",
                      }}
                      className="button">
                      <FaDiscord className="icon" style={{
                        color: "white",
                        marginLeft:"-8px",
                        marginTop:"-8px"
                      }} />
                    </button>
                  </Row>
                </div>
                <div className="center2" style={{
                  color: "white"
                }}>
                  Discord
                </div>
              </Col>
              <Col>
                <div className="center2">
                  <Row>
                    <button
                      onClick={() => {
                        window.open("https://github.com/altaga/Artic", "_blank");
                      }}
                      style={{
                        width: "82px",
                        height: "82px",
                        fontSize: "2rem",
                      }}
                      className="button">
                      <FaGithub className="icon" style={{
                        color: "white",
                        marginLeft:"-8px",
                        marginTop:"-8px"
                      }} />
                    </button>
                  </Row>
                </div>
                <div className="center2" style={{
                  color: "white"
                }}>
                  Github
                </div>
              </Col>
              <Col>
                <div className="center2">
                  <Row>
                    <button
                      onClick={() => {
                        window.open("https://twitter.com/artic_protocol", "_blank");
                      }}
                      style={{
                        width: "82px",
                        height: "82px",
                        fontSize: "2rem",
                      }}
                      className="button">
                      <FaTwitter className="icon" style={{
                        color: "white",
                        marginLeft:"-8px",
                        marginTop:"-8px"
                      }} />
                    </button>
                  </Row>
                </div>
                <div className="center2" style={{
                  color: "white"
                }}>
                  Twitter
                </div>
              </Col>
              <Col>
                <div className="center2">
                  <Row>
                    <button
                      onClick={() => {
                        window.open("https://t.me/ArticProtocol", "_blank");
                      }}
                      style={{
                        width: "82px",
                        height: "82px",
                        fontSize: "2rem",
                      }}
                      className="button">
                      <FaTelegram className="icon" style={{
                        color: "white",
                        marginLeft:"-8px",
                        marginTop:"-8px"
                      }} />
                    </button>
                  </Row>
                </div>
                <div className="center2" style={{
                  color: "white"
                }}>
                  Telegram
                </div>
              </Col>
              <Col>
                <div className="center2">
                  <Row>
                    <button
                      onClick={() => {
                        window.open("https://www.instagram.com/articprotocol/", "_blank");
                      }}
                      style={{
                        width: "82px",
                        height: "82px",
                        fontSize: "2rem",
                      }}
                      className="button">
                      <FaInstagram className="icon" style={{
                        color: "white",
                        marginLeft:"-8px",
                        marginTop:"-8px"
                      }} />
                    </button>
                  </Row>
                </div>
                <div className="center2" style={{
                  color: "white"
                }}>
                  Instagram
                </div>
              </Col>
            </div>
          </div>
          <div style={{ marginTop: "10vh" }} />
          <Row>
            <Col>
              <div>
                <img alt="footerLogo" src={logoFooter} width="100vw" />
              </div>
            </Col>
          </Row>
          <div style={{
            color: "white",
            paddingTop: "20vh",
          }}>
            © 2022 Artic  ·  Privacy Policy
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
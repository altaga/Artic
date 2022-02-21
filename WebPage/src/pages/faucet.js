// Basic imports
import '../assets/main.css';
import { Component } from 'react';

// Frontend Components
import { Col, Row, Button, Input } from 'reactstrap';
import Modals from '../components/modal';

// Assets

// Utils
import autoBind from 'react-autobind';

// Web3 imports
import Web3 from 'web3';
import { abi } from '../contracts/contractOracle.js';
const web3 = new Web3(new Web3.providers.HttpProvider('https://testnet.aurora.dev'));

// The Aurora address of the smart contract
const oracleFPS = "0xe66dAee629345eD9F231CC5C87B68EbCD1E69aA9";

// Setup Contract object based on the ABI
const ContractO = new web3.eth.Contract(abi(), oracleFPS);

class Facuet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValues: [],
      textValues: [" FPS", " Nodes", " Transactions"],
      auroraAddress: "",
      waiting: false,
    };
    autoBind(this);
    this.updateInterval = null;
  }

  async updateValues() {
    let result = [];
    result[0] = await ContractO.methods.latestAnswer().call() / 1e6;
    result[1] = 2;
    result[2] = 3;
    this.setState({
      displayValues: result
    });
  }

  componentDidMount() {
    /*
    this.updateValues();
    this.updateInterval = setInterval(async () => {
      this.updateValues();
    }, 5000);
    */
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    console.log(this.state.auroraAddress.length === 42)
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
                Artic Token <br /> Faucet Testnet
              </h1>
            </div>
            <div style={{ marginTop: "2vh" }} />
            <div className="center2">
              <div style={{
                width: "40vw",
                color: "white",
                fontSize: "24px",
                paddingTop: "2vh",
              }}>
                <Row>
                  <Col xs="11">
                    <Input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Enter your address"
                      style={{
                        width: "100%",
                        color: "black",
                        fontSize: "24px",
                      }}
                      onChange={(e) => {
                        this.setState({
                          auroraAddress: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  <Col xs="1">
                    <Modals></Modals>
                  </Col>
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
                  <Col xs="12">
                    <Button style={{
                      color: "black",
                      fontSize: "24px",
                      fontWeight: "bold",
                      backgroundColor: "#4CAF50",
                      borderRadius: "25px",
                    }}
                      disabled={!(this.state.auroraAddress.length === 42) || this.state.waiting}
                      onClick={() => {
                        this.setState({
                          waiting: true
                        }, () => {
                          var myHeaders = new Headers();
                          myHeaders.append("account", this.state.auroraAddress);
                          var requestOptions = {
                            method: 'GET',
                            headers: myHeaders,
                            redirect: 'follow'
                          };

                          fetch("https://b0yt4cylp1.execute-api.us-east-1.amazonaws.com/faucet", requestOptions)
                            .then(response => response.text())
                            .then(result => {
                              console.log(result);
                              this.setState({
                                waiting: false,
                                auroraAddress: ""
                              },
                                () => {
                                  document.getElementById("address").value = "";
                                });
                            })
                            .catch(error => console.log('error', error));
                        });
                      }}>
                      {
                        this.state.waiting ?
                          "AirDrop in progress" :
                          "AirDrop 10 TIC"
                      }
                    </Button>
                  </Col>
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
                Token address:
                0x42cD5De0ba1a8c05d9C79726db57bAeBCF0915Af
              </div>
            </div>
            <p />
            <div className="center2">
              <div style={{
                width: "40vw",
                color: "white",
                fontSize: "24px"
              }}>
                <a href="https://explorer.testnet.aurora.dev/token/0x42cD5De0ba1a8c05d9C79726db57bAeBCF0915Af" target="_blank" rel="noopener noreferrer">
                  Token on Aurora Explorer
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Facuet;
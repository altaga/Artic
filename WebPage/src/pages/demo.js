// Basic imports
import '../assets/main.css';
import { Component } from 'react';

// Frontend Components
import { Card, CardBody, CardHeader, CardFooter, Col, Row } from 'reactstrap';

// Icons 
import { MdOutlineDirectionsWalk } from "react-icons/md";
import { MdOutlineDirectionsCarFilled } from "react-icons/md";
import { MdTwoWheeler } from "react-icons/md";
import { MdPets } from "react-icons/md";

// Utils
import autoBind from 'react-autobind';
import ReactPlayer from "react-player"

// Web3 imports
import Web3 from 'web3';
import { abi } from '../contracts/contractNode.js';
const web3 = new Web3(new Web3.providers.HttpProvider('https://testnet.aurora.dev'));

// The Aurora address of the smart contract
const oracleHumans = "0x0d608FBa0b1F7CF8015e052aDb5dC7D9fFAa753d";
const oracleCars = "0xe3C99a49eD7E6c14c03650394F5DB1A35A2177b5";
const oracleMotor = "0x8510eCC6a9974B992337553D62eF5B32c93D841c";
const oracleDogs = "0x039E0a3fa88288a3305c0053BbC9e2A114d217db";

// Setup Contract object based on the ABI
const ContractH = new web3.eth.Contract(abi(), oracleHumans);
const ContractC = new web3.eth.Contract(abi(), oracleCars);
const ContractM = new web3.eth.Contract(abi(), oracleMotor);
const ContractD = new web3.eth.Contract(abi(), oracleDogs);

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conrtactOracles: [oracleHumans, oracleCars, oracleMotor, oracleDogs],
      contractValues: [0, 0, 0, 0],
      contracts: [ContractH, ContractC, ContractM, ContractD],
      icons: [
        <MdOutlineDirectionsWalk size={100} color="white" />,
        <MdOutlineDirectionsCarFilled size={100} color="white" />,
        <MdTwoWheeler size={100} color="white" />,
        <MdPets size={100} color="white" />,
      ],
    };
    autoBind(this);
    this.updateInterval = null;
  }

  async updateValues() {
    let result = [0, 0, 0, 0];
    await Promise.all(
      this.state.contracts.map(async (value, index) => {
        result[index] = await value.methods.latestAnswer().call()
      })
    )
    this.setState({
      contractValues: result
    });
  }

  componentDidMount() {
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
      <div className="App" style={{
        backgroundColor: '#041417',
      }}>
        <div style={{paddingTop:"10vh"}}/>
        <div style={{
          margin: "30px"
        }}>
          <Row>
            {
              this.state.conrtactOracles.map((value, index) => {
                return (
                  <Col key={"Col" + index} xs="3">
                    <Card style={{
                      backgroundColor: '#0d2b32',
                      borderRadius: '10px',
                      color: 'white',
                    }}>
                      <CardHeader>
                        Oracle{" "}:{" "}
                        {
                          <a href={`https://explorer.testnet.aurora.dev/address/${value}`} target="_blank" rel="noopener noreferrer">
                            {
                              value.substring(0, 10) + "..." + value.substring(value.length - 10, value.length)
                            }
                          </a>
                        }
                      </CardHeader>
                      <CardBody style={{
                        alignItems: 'center',
                      }}>
                        {
                          this.state.icons[index]
                        }
                      </CardBody>
                      <CardFooter>
                        {
                          this.state.contractValues[index]
                        }
                      </CardFooter>
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
          <div style={{
            marginTop: "30px"
          }} />
          <Row>
            <Col xs="6">
              <h1 style={{
                textAlign: "center",
                color: "white",
              }}>
                Scalable, decentralized AI network.
              </h1>
              <h5 style={{
                textAlign: "center",
                color: "white",
                fontSize: "1.6rem",
                paddingTop: "40px",
              }}>
                This Proof of Concept offers AI Computer <br/>
                Vision Services through Flux Oracles and <br/>
                mining capabilities via our Aurora-based TIC token.
              </h5>
            </Col>
            <Col xs="4">
              <ReactPlayer
                url="https://youtu.be/yygXL4Zh7i4"
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Demo;
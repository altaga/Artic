// Basic imports
import '../assets/main.css';
import { Component } from 'react';

// Frontend Components
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Button } from 'reactstrap';
import { Spinner } from 'react-bootstrap';

// Assets

import jetson from '../assets/jetson.png';

// Utils
import autoBind from 'react-autobind';

// Web3 imports
import Web3 from 'web3';
import { abi } from '../contracts/contractOracle.js';
import { abi as abi2 } from '../contracts/contractNode.js';
import { abi as abi3 } from '../contracts/contractToken.js';
const web3 = new Web3(new Web3.providers.HttpProvider('https://testnet.aurora.dev'));

// Functions
function objectContract(abi, address) {
  return new web3.eth.Contract(abi, address)
}

async function getFirstTransaction(address) {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "jsonrpc": "2.0",
      "method": "eth_getLogs",
      "params": [
        {
          "address": address,
          "fromBlock": "earliest",
          "toBlock": "latest",
          "paging_options": {
            "transactionIndex": 0
          }
        }
      ],
      "id": 0
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://explorer.testnet.aurora.dev/api/eth-rpc", requestOptions)
      .then(response => response.text())
      .then(result => resolve(JSON.parse(result).result[0].transactionHash))
      .catch(error => reject(error));
  })
}

async function getDeployer(transactionHash) {
  return new Promise((resolve, reject) => {
    web3.eth.getTransaction(transactionHash, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result.from);
      }
    });
  })
}

// The Aurora address of the smart contract
const fpsContract = "0xe66dAee629345eD9F231CC5C87B68EbCD1E69aA9";

// Setup Contract object based on the ABI
const Contract = objectContract(abi(), fpsContract);

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractNodes: ["", "", "", ""],
      contractValues: [0, 0, 0, 0],
      contracts: ["", "", "", ""],
      wallets: ["", "", "", ""],
    };
    autoBind(this);
    this.updateInterval = null;
  }

  async transferTIC(address, value) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    let transactionWeb3 = new Web3(window.ethereum);
    const contract = new transactionWeb3.eth.Contract(abi3(), "0x42cD5De0ba1a8c05d9C79726db57bAeBCF0915Af", { from: account });
    contract.methods.transfer(address, web3.utils.toWei((value).toString(), "ether")).send({ from: account }).on('transactionHash', (hash) => {
      console.log(hash);
    })
  }

  async updateValues() {
    let result = [0, 0, 0, 0];
    await Promise.all(
      this.state.contracts.map(async (value, index) => {
        result[index] = parseFloat(await this.state.contracts[index].methods.latestAnswer().call()) / 1000000
      })
    )
    this.setState({
      contractValues: result
    });
  }

  async componentDidMount() {
    let result = [];
    let result2 = [];
    let result3 = [];
    let result4 = [];
    await Promise.all(
      this.state.contracts.map(async (value, index) => {
        try {
          result[index] = await Contract.methods.oracles(parseInt(index)).call()
          result2[index] = objectContract(abi2(), result[index].toString())
          result3[index] = parseFloat(await result2[index].methods.latestAnswer().call()) / 1000000
          result4[index] = await getDeployer(await getFirstTransaction(result[index]))
        }
        catch (e) {

        }
      })
    )
    this.setState({
      contractNodes: result,
      contracts: result2,
      contractValues: result3,
      wallets: result4
    }, () => {

      this.updateInterval = setInterval(async () => {
        this.updateValues();
      }, 5000);
      
    });
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
              this.state.contractNodes[0] !== "" ?
                <>
                  {
                    this.state.contractNodes.map((value, index) => {
                      return (
                        <Col key={"Col" + index} xs="3">
                          <Card style={{
                            backgroundColor: '#0d2b32',
                            borderRadius: '10px',
                            color: 'white',
                          }}>
                            <CardHeader>
                              <div>
                                Node {" "}:{" "}
                                {
                                  <a href={`https://explorer.testnet.aurora.dev/address/${value}`} target="_blank" rel="noopener noreferrer">
                                    {
                                      value.substring(0, 10) + "..." + value.substring(value.length - 10, value.length)
                                    }
                                  </a>
                                }
                              </div>
                              <div>
                                Validator {" "}:{" "}
                                {
                                  <a href={`https://explorer.testnet.aurora.dev/address/${this.state.wallets[index]}`} target="_blank" rel="noopener noreferrer">
                                    {
                                      this.state.wallets[index].substring(0, 10) + "..." + this.state.wallets[index].substring(this.state.wallets[index].length - 10, this.state.wallets[index].length)
                                    }
                                  </a>
                                }
                              </div>
                            </CardHeader>
                            <CardBody style={{
                              alignItems: 'center',
                            }}>
                              <img src={jetson} alt="jetson" style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '10px',
                              }} />
                            </CardBody>
                            <CardFooter style={{ fontSize: "2rem" }}>
                              <Row>
                                <Col xs="5">
                                  {
                                    this.state.contractValues[index] + " FPS"
                                  }
                                </Col>
                                <Col xs="7">
                                  <Button onClick={() => {
                                    this.transferTIC(this.state.wallets[index], this.state.contractValues[index])
                                  }} color="info" style={{ fontSize: "1.5rem", borderRadius: "25px", fontWeight: "bold" }}>
                                    Pay {this.state.contractValues[index]} TIC
                                  </Button>
                                </Col>
                              </Row>
                            </CardFooter>
                          </Card>
                        </Col>
                      )
                    })
                  }
                </>
                :
                <div className="center">
                  <Spinner animation="border" variant="info" />
                </div>
            }
          </Row>
        </div>
      </div>
    );
  }
}

export default Payment;
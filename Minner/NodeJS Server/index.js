///////////////////////// Get Express Module
const express = require('express');

///////////////////////// Get the web3 Module
var Web3 = require('web3');
var { abi } = require('./contract.js');
var Tx = require('ethereumjs-tx');

// Show web3 where it needs to look for the Ethereum node.
let web3 = new Web3(new Web3.providers.HttpProvider('https://testnet.aurora.dev'));

///////////////////////// Server Variables and Constants

const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

///////////////////////// Web3 Variables and Constants

// Setup Server Private Key
let privateKey = '0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
// The Aurora address of the smart contract
var addrHumans = "0x0d608FBa0b1F7CF8015e052aDb5dC7D9fFAa753d";
var addrCars = "0xe3C99a49eD7E6c14c03650394F5DB1A35A2177b5";
var addrMotor = "0x8510eCC6a9974B992337553D62eF5B32c93D841c";
var addrDogs = "0x039E0a3fa88288a3305c0053BbC9e2A114d217db";
var addrFPS = "0xF2D7621a6CE7fa4171C4a93eb41035f647a486BE";
// Build a new variable based on the web3 API including the ABI and address of the contract
var ContractH = new web3.eth.Contract(abi(), addrHumans);
var ContractC = new web3.eth.Contract(abi(), addrCars);
var ContractM = new web3.eth.Contract(abi(), addrMotor);
var ContractD = new web3.eth.Contract(abi(), addrDogs);
var ContractF = new web3.eth.Contract(abi(), addrFPS);

///////////////////////// Send Transaction Function

async function send(web3, privateKey, contract, value) {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey).address;
    const transaction = contract.methods.transmit(value);
    const options = {
        to: transaction._parent._address,
        data: transaction.encodeABI(),
        gas: await transaction.estimateGas({ from: account })
    };
    const signed = await web3.eth.accounts.signTransaction(options, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    return receipt;
}

///////////////////////// App routes

app.get('/home', (req, res) => {
    res.send('Hello From Jetson Server');
});

app.get('/send', async (req, res) => {
    const humans = parseInt(req.query.humans);
    const cars = parseInt(req.query.cars);
    const motor = parseInt(req.query.motor);
    const dogs = parseInt(req.query.dogs);
    const fps = parseInt(req.query.fps*1000000);

    try {
        let resultH = await ContractH.methods.latestAnswer().call()
        let resultC = await ContractC.methods.latestAnswer().call()
        let resultM = await ContractM.methods.latestAnswer().call()
        let resultD = await ContractD.methods.latestAnswer().call()
        let resultF = await ContractF.methods.latestAnswer().call()
        resultH = await send(web3, privateKey, ContractH, humans + parseInt(resultH))
        resultC = await send(web3, privateKey, ContractC, cars + parseInt(resultC))
        resultM = await send(web3, privateKey, ContractM, motor + parseInt(resultM))
        resultD = await send(web3, privateKey, ContractD, dogs + parseInt(resultD))
        resultF = await send(web3, privateKey, ContractF, fps)
        resultH = await ContractH.methods.latestAnswer().call()
        resultC = await ContractC.methods.latestAnswer().call()
        resultM = await ContractM.methods.latestAnswer().call()
        resultD = await ContractD.methods.latestAnswer().call()
        resultF = await ContractF.methods.latestAnswer().call()
        res.json({ 
            "humans": resultH,
            "cars": resultC,
            "motor": resultM,
            "dogs": resultD,
            "fps": resultF
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

app.get('/check', async (req, res) => {
    try {
        let resultH = await ContractH.methods.latestAnswer().call()
        let resultC = await ContractC.methods.latestAnswer().call()
        let resultM = await ContractM.methods.latestAnswer().call()
        let resultD = await ContractD.methods.latestAnswer().call()
        let resultF = await ContractF.methods.latestAnswer().call()
        res.json({ 
            "humans": resultH,
            "cars": resultC,
            "motor": resultM,
            "dogs": resultD,
            "fps": resultF
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

app.get('/reset', async (req, res) => {
    try {
        let resultH = await send(web3, privateKey, ContractH, 0)
        let resultC = await send(web3, privateKey, ContractC, 0)
        let resultM = await send(web3, privateKey, ContractM, 0)
        let resultD = await send(web3, privateKey, ContractD, 0)
        let resultF = await send(web3, privateKey, ContractF, 1)
        resultH = await ContractH.methods.latestAnswer().call()
        resultC = await ContractC.methods.latestAnswer().call()
        resultM = await ContractM.methods.latestAnswer().call()
        resultD = await ContractD.methods.latestAnswer().call()
        resultF = await ContractF.methods.latestAnswer().call()
        res.json({ 
            "humans": resultH,
            "cars": resultC,
            "motor": resultM,
            "dogs": resultD,
            "fps": resultF
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

///////////////////////// Start the server

app.listen(PORT, HOST);
console.log(`Running on http://localhost:${PORT}`);
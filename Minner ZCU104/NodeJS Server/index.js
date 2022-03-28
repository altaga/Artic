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
let privateKey = require('./creds.js').privateKey;
// The Aurora address of the smart contract
var addrHumans = "0x019677ec8d776c596124F68753E016687684514D";
var addrCars = "0xBbc4C0f5C7f6a15e64B112b496592bf7cDc93f21";
var addrMotor = "0x65CCD1E9f0d2b4Ddd57c4DB6FC857d8df81DFf41";
var addrDogs = "0xd7325CB258669F67723468c01ef24cE6b6A7d88d";
var addrFPS = "0x3988b42F7205893c7551b9a9984A44A076f151F2";
// Build a new variable based on the web3 API including the ABI and address of the contract
var ContractH = new web3.eth.Contract(abi(), addrHumans);
var ContractC = new web3.eth.Contract(abi(), addrCars);
var ContractM = new web3.eth.Contract(abi(), addrMotor);
var ContractD = new web3.eth.Contract(abi(), addrDogs);
var ContractF = new web3.eth.Contract(abi(), addrFPS);

///////////////////////// Delay

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
    res.send('Hello From ZCU104 Server');
});

app.get('/send', async (req, res) => {
    const humans = parseInt(req.query.humans);
    const cars = parseInt(req.query.cars);
    const motor = parseInt(req.query.motor);
    const dogs = parseInt(req.query.dogs);
    const fps = parseInt(req.query.fps*1000000);
    console.log(`humans: ${humans}`, `cars: ${cars}`, `motor: ${motor}`, `dogs: ${dogs}`, `fps: ${fps}`);
    const delayMS = 1000;
    try {
        let resultH = await ContractH.methods.latestAnswer().call()
        await delay(delayMS);
        console.log(`H: ${resultH}`);
        let resultC = await ContractC.methods.latestAnswer().call()
        await delay(delayMS);
        console.log(`C: ${resultC}`);
        let resultM = await ContractM.methods.latestAnswer().call()
        await delay(delayMS);
        console.log(`M: ${resultM}`);
        let resultD = await ContractD.methods.latestAnswer().call()
        await delay(delayMS);
        console.log(`D: ${resultD}`);
        let resultF = await ContractF.methods.latestAnswer().call()
        await delay(delayMS);
        console.log(`F: ${resultF}`);
        resultH = await send(web3, privateKey, ContractH, humans + parseInt(resultH))
        await delay(delayMS);
        console.log(`H: ${resultH}`);
        resultC = await send(web3, privateKey, ContractC, cars + parseInt(resultC))
        await delay(delayMS);
        console.log(`C: ${resultC}`);
        resultM = await send(web3, privateKey, ContractM, motor + parseInt(resultM))
        await delay(delayMS);
        console.log(`M: ${resultM}`);
        resultD = await send(web3, privateKey, ContractD, dogs + parseInt(resultD))
        await delay(delayMS);
        console.log(`D: ${resultD}`);
        resultF = await send(web3, privateKey, ContractF, fps)
        await delay(delayMS);
        console.log(`F: ${resultF}`);
        res.status(200).send("ok");
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/check', async (req, res) => {
    const delayMS = 1000;
    try {
        let resultH = await ContractH.methods.latestAnswer().call()
        await delay(delayMS);
        console.log(`H: ${resultH}`);
        let resultC = await ContractC.methods.latestAnswer().call()
        await delay(delayMS);
        console.log(`C: ${resultC}`);
        let resultM = await ContractM.methods.latestAnswer().call()
        await delay(delayMS);
        console.log(`M: ${resultM}`);
        let resultD = await ContractD.methods.latestAnswer().call()
        await delay(delayMS);
        console.log(`D: ${resultD}`);
        let resultF = await ContractF.methods.latestAnswer().call()
        await delay(delayMS);
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
    const delayMS = 1000;
    try {
        let resultH = await send(web3, privateKey, ContractH, 0)
        await delay(1000);
        console.log(`H: ${resultH}`);
        let resultC = await send(web3, privateKey, ContractC, 0)
        await delay(1000);
        console.log(`C: ${resultC}`);
        let resultM = await send(web3, privateKey, ContractM, 0)
        await delay(1000);
        console.log(`M: ${resultM}`);
        let resultD = await send(web3, privateKey, ContractD, 0)
        await delay(1000);
        console.log(`D: ${resultD}`);
        let resultF = await send(web3, privateKey, ContractF, 1)
        await delay(1000);
        console.log(`F: ${resultF}`);
        resultH = await ContractH.methods.latestAnswer().call()
        await delay(1000);
        console.log(`H: ${resultH}`);
        resultC = await ContractC.methods.latestAnswer().call()
        await delay(1000);
        console.log(`C: ${resultC}`);
        resultM = await ContractM.methods.latestAnswer().call()
        await delay(1000);
        console.log(`M: ${resultM}`);
        resultD = await ContractD.methods.latestAnswer().call()
        await delay(1000);
        console.log(`D: ${resultD}`);
        resultF = await ContractF.methods.latestAnswer().call()
        await delay(1000);
        console.log(`F: ${resultF}`);
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
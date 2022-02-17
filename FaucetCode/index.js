var Web3 = require('web3');
var { abi } = require('./contract.js');
let privateKey = '0x0000000000000000000000000000000000000000000000000000000000000000';
let web3 = new Web3(new Web3.providers.HttpProvider('https://testnet.aurora.dev'));

async function send(address, value) {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey).address;
    const contract = new web3.eth.Contract(abi(), "0x42cD5De0ba1a8c05d9C79726db57bAeBCF0915Af", { from: account });
    const transaction = contract.methods.transfer(address, web3.utils.toWei((value).toString(), "ether"))
    const options = {
        to: transaction._parent._address,
        data: transaction.encodeABI(),
        gas: await transaction.estimateGas({ from: account })
    };
    const signed = await web3.eth.accounts.signTransaction(options, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    return receipt;
}

exports.handler = async (event) => {
    let result = await send(event["headers"]["account"],10);
    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };
    return response;
};

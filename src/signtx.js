const Tx = require('ethereumjs-tx');
const express = require('express');
const http = require('http');
const ethUtil = require("ethereumjs-util");

// const Web3 = require("web3");
// const web3 = new Web3(new Web3.providers.HttpProvider('http://onther.asuscomm.com:5545'));

const app = express();

app.use(express.json());
app.server = http.createServer(app);

app.get('/:chain/make', async (req, res) => {
  const privateKey = new Buffer(req.body.privateKey, 'hex');
  if (!ethUtil.isValidPrivate(privateKey)) {
    return res.status(400).json({
      code: 1,
      message: `private key length is invalid`,
    });
  }
  const rawTx = req.body.rawTx;

  const tx = new Tx(rawTx);
  tx.sign(privateKey);

  const serializedTx = tx.serialize();

  return res.status(200).json({
    code: 0,
    message: 'success',
    response: {
      serializedTx: '0x' + serializedTx.toString('hex'),
    }
  })
});


app.server.listen("8060", () => {
  console.log(`Started on port 8080`);
});
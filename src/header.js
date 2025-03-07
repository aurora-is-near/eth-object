const { decode, toBuffer, KECCAK256_RLP_ARRAY, KECCAK256_NULL } = require('eth-util-lite')
const EthObject = require('./ethObject')
const utils = require('ethereumjs-util')
const web3 = require('web3')

class Header extends EthObject {

  static get fields() {
    return [
      'parentHash',
      'sha3Uncles',
      'miner',
      'stateRoot',
      'transactionsRoot',
      'receiptRoot',
      'logsBloom',
      'difficulty',
      'number',
      'gasLimit',
      'gasUsed',
      'timestamp',
      'extraData',
      'mixHash',
      'nonce',
      'baseFeePerGas',
      'withdrawalsRoot',
      'blobGasUsed',
      'excessBlobGas',
      'parentBeaconBlockRoot',
      'requestsHash'
    ]
  }

  constructor(raw = this.NULL) {
    super(Header.fields, raw)
  }

  static fromBuffer(buf) { return buf ? new this(decode(buf)) : new this() }
  static fromHex(hex) { return hex ? new this(decode(hex)) : new this() }
  static fromRaw(raw) { return new this(raw) }
  static fromObject(rpcResult) { return this.fromRpc(rpcResult) }
  static fromRpc(rpcResult) {
    if (rpcResult) {
      let data = [
        toBuffer(rpcResult.parentHash),
        toBuffer(rpcResult.sha3Uncles) || KECCAK256_RLP_ARRAY,
        toBuffer(rpcResult.miner),
        toBuffer(rpcResult.stateRoot) || KECCAK256_NULL,
        toBuffer(rpcResult.transactionsRoot) || KECCAK256_NULL,
        toBuffer(rpcResult.receiptsRoot) || toBuffer(rpcResult.receiptRoot) || KECCAK256_NULL,
        toBuffer(rpcResult.logsBloom),
        toBuffer(rpcResult.difficulty),
        toBuffer(rpcResult.number),
        toBuffer(rpcResult.gasLimit),
        toBuffer(rpcResult.gasUsed),
        toBuffer(rpcResult.timestamp),
        toBuffer(rpcResult.extraData),
        toBuffer(rpcResult.mixHash),
        toBuffer(rpcResult.nonce)
      ]
      if (rpcResult.baseFeePerGas !== undefined && rpcResult.baseFeePerGas !== null) {
        data.push(toBuffer(rpcResult.baseFeePerGas));
      }
      if (rpcResult.withdrawalsRoot !== undefined && rpcResult.withdrawalsRoot !== null) {
        data.push(toBuffer(rpcResult.withdrawalsRoot));
      }
      if (rpcResult.blobGasUsed !== undefined && rpcResult.blobGasUsed !== null) {
        data.push(toBuffer(rpcResult.blobGasUsed));
      }
      if (rpcResult.excessBlobGas !== undefined && rpcResult.excessBlobGas !== null) {
        data.push(toBuffer(rpcResult.excessBlobGas));
      }
      if (rpcResult.parentBeaconBlockRoot !== undefined && rpcResult.parentBeaconBlockRoot !== null) {
        data.push(toBuffer(rpcResult.parentBeaconBlockRoot));
      }
      if (rpcResult.requestsHash !== undefined && rpcResult.requestsHash !== null) {
        data.push(toBuffer(rpcResult.requestsHash));
      }
      return new this(data);
    } else {
      return new this()
    }
  }

  static fromWeb3(web3Result) {
    let rpcResult = Object.assign({}, web3Result)
    rpcResult.difficulty = web3.utils.toHex(rpcResult.difficulty)
    rpcResult.number = web3.utils.toHex(rpcResult.number)
    rpcResult.gasLimit = web3.utils.toHex(rpcResult.gasLimit)
    rpcResult.gasUsed = web3.utils.toHex(rpcResult.gasUsed)
    rpcResult.timestamp = web3.utils.toHex(rpcResult.timestamp)
    if (rpcResult.baseFeePerGas !== undefined && rpcResult.baseFeePerGas !== null) {
      rpcResult.baseFeePerGas = web3.utils.toHex(rpcResult.baseFeePerGas)
    }
    if (rpcResult.blobGasUsed !== undefined && rpcResult.blobGasUsed !== null) {
      rpcResult.blobGasUsed = web3.utils.toHex(rpcResult.blobGasUsed)
    }
    if (rpcResult.excessBlobGas !== undefined && rpcResult.excessBlobGas !== null) {
      rpcResult.excessBlobGas = web3.utils.toHex(rpcResult.excessBlobGas)
    }
    return this.fromRpc(rpcResult)
  }
}

module.exports = Header

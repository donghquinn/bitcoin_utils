import bitcoin from 'bitcoinjs-lib';
import bitcore from 'bitcore-lib';
import { ECPair } from '../address/base.mjs';
import { getInputData } from './input.mjs';
import { createPayment } from './payment.mjs';


export const createTransaction = async (address, value, wif, toAddress, script1, script2, txid, hex) => {
  try {
    console.log("Parameters: %o", { address, value, toAddress, script1, script2, txid, hex });
    const signer = ECPair.fromWIF(wif, bitcoin.networks.testnet);
    const privateKey = signer.privateKey;
    const publicKey = signer.publicKey;

    console.log("privateKey: %o", { privateKey: signer.privateKey.toString("hex") });

    const payment = bitcoin.payments.p2pkh({ pubkey: publicKey, network: bitcoin.networks.testnet });

    const psbt = new bitcoin.Psbt({ network: bitcoin.networks.testnet });

    const txHash = Buffer.from(txid, 'hex');
    const utxoBuffer = Buffer.from(hex + txid + script2, 'hex');

    // TODO 증인이 아닌 UTXO가 제공된 경우 해당 해시는 prevout에 지정된 해시와 일치해야 합니다.
    psbt.addInput({ hash: hex, index: 0, nonWitnessUtxo: utxoBuffer });
    psbt.addOutput({ address, value });
    psbt.signInput(0, signer);
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }

}
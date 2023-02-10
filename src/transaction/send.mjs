import { toBasicAuth } from '../common/common.mjs';
import fetch from 'node-fetch';

/**
 *
 * @param txId 서명된 hex-encoded된 트랜잭션
 * @param vout
 * @returns
 */
export const sendToAddress = async (
  txId

) => {
  const headers = {
    authorization: toBasicAuth("testuser", "1234"),
    "content-type": "text/plain",
    Accept: "text/plain",
  };

  // const signer = ECPair.fromWIF(wif, bitcoin.networks.testnet);
  // const psbt = new bitcoin.Psbt({ network: bitcoin.networks.testnet });

  // psbt.addInput({ hash: txId, index: vout });
  // psbt.addOutput({ script: txScript, value });

  // psbt.signInput(0, signer);

  // const trasnaction = psbt.finalizeAllInputs().extractTransaction();

  // console.log("Signed TX: %o", { trasnaction });
  // return trasnaction;
  // const transaction = await signTransaction(
  //   txId,
  //   vout,
  //   "n2DzVkupuqjqC1yxckTRxLQnmi9RVjXrk5",
  //   "cNVPsNdjz7ZrZWCv3gURoAqXJ38qcbGC7NETqU15f8yJi8zma4LU",
  //   1
  // );

  // const txHashs = transaction.getHash().toString("hex");

  // console.log("TxHash from transactions: %o", { txId });
  // const controller = new AbortController();

  const options = {
    headers,
    method: "POST",
    body: JSON.stringify({
      id: "HTTP_FIXED",
      method: "sendrawtransaction",
      jsonrpc: "1.0",
      params: [txId],
    }),
  };

  // // const quickNodeUrl = `${process.env.TESTNET_URL}/${process.env.TESTNET_TOKEN}`;
  const nodeUrl = process.env.TESTNET_NODE;

  const response = await (await fetch(nodeUrl, options)).json();

  console.log("Send To ToAddress Response: %o", {
    response,
  });

  return response;
};
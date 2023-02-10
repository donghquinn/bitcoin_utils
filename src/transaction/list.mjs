import { toBasicAuth } from "../common/common.mjs"
import fetch from "node-fetch";

export const getLists = async (address) => {
  try {
    const url = process.env.TESTNET_NODE;

    const headers = {
      authorization: toBasicAuth("testuser", "1234"),
      "content-type": "text/plain",
      Accept: "text/plain",
    };

    console.log("Received Address: %o", { address })
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        id: "HTTP_FIXED",
        method: "searchrawtransactions",
        jsonrpc: "1.0",
        params: ["n1NvevFeaYgFmBL15BrSvzVjP47HBuMWS6"],
      }),
    };

    const response = await (await fetch(url, options)).text();

    const responseData = JSON.parse(response);
    // const current = responseData.result[responseData.result.length - 1];

    // 가장 최신 txid 와 다른 데이터
    // const hex = responseData.result[responseData.result.length - 1].hex;
    // const txId = responseData.result[responseData.result.length - 1].txid;

    // const script = current.vin[current.vin.length - 1].scriptSig;

    // const vOut = responseData.result[responseData.result.length - 1].vout;
    // const vin = responseData.result[responseData.result.length - 1].vin;

    console.log("Responded Data: %o", { responseData });

    const vout = responseData.result[0].vout;
    const vin = responseData.result[0].vin;
    const txid = responseData.result[0].txid;
    const hex = responseData.result[0].hex;

    console.log("Transaction Info: %o", { txid, hex });

    console.log("vout & vin: %o", {
      vout, vin
    });

    const script1 = vout[0].scriptPubKey.hex;
    const voutTx1Index = vout[0].n;
    // const script = vout[0].scriptPubKey;
    const script2 = vout[1].scriptPubKey.hex;
    const voutTx2Index = vout[1].n;

    console.log("Reference TransactionId: %o", { script1, voutTx1Index, script2, voutTx2Index });

    const vinTx1 = vin[0].txid;
    const vinTx1Index = vin[0].vout;

    console.log("Reference TransactionInput: %o", { vinTx1, vinTx1Index });
    // const voutTx1 = vOut[0].scriptPubKey.hex;
    // const voutTx2 = vOut[1].scriptPubKey.hex;

    // const hash = current.hash;
    // const hex = current.hex;
    // // const txid = current.txid;
    // const outputTxid = current.txid;
    // // const possibleOutPutTxid = current.vin[current.vin.length - 1].txid;
    // const index = responseData.result.length;

    // console.log("Result: %o", { vOut, vin, voutTx1, voutTx2 })

    // const returnData = { vOut, vin, voutTx1, voutTx2 };

    // return returnData;

    return { script1, voutTx1Index, script2, voutTx2Index, vinTx1, vinTx1Index, txid, hex };
    // const responseData = JSON.parse(response) as TransactionList;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

};
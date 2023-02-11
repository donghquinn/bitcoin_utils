import { toBasicAuth } from "../common/common.mjs"
import fetch from "node-fetch";

/**
 * 
 * @param {*} address fromAddress
 * @returns fromAddress의 거래 내역 중 vOut의 scriptPubKey와 그 인덱스 값
 */
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

    const vout = responseData.result[0].vout;
    const vin = responseData.result[0].vin;

    const txid = responseData.result[0].txid;
    const hex = responseData.result[0].hex;

    // console.log("Transaction Info: %o", { txid, hex });

    console.log("vout & vin: %o", {
      vout, vin
    });

    let script;
    let index;

    for (let i = 0; i < vout.length; i += 1) {
      vout[i].scriptPubKey.addresses.filter((item) => {
        if (item === address) {
          index = vout[i].n;
          script = vout[i].scriptPubKey.hex;
        }
      })
    };

    console.log("Reference TransactionId: %o", { script, index });

    return { txid, hex, script, index };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

};
import fetch from 'node-fetch';
import { toBasicAuth } from '../common/common.mjs';

/**
 *
 * @param txId 서명된 hex-encoded된 트랜잭션
 * @param vout
 * @returns
 */
export const sendToAddress = async (txId, networkType) => {
  try {
    const headers = {
      authorization: toBasicAuth('testuser', '1234'),
      'content-type': 'text/plain',
      Accept: 'text/plain',
    };

    const options = {
      headers,
      method: 'POST',
      body: JSON.stringify({
        id: 'HTTP_FIXED',
        method: 'sendrawtransaction',
        jsonrpc: '1.0',
        params: [txId],
      }),
    };

    // // const quickNodeUrl = `${process.env.TESTNET_URL}/${process.env.TESTNET_TOKEN}`;
    let nodeUrl;

    if (networkType === "main") { nodeUrl = process.env.MAINNET_NODE; }
    if (networkType === "test") { nodeUrl = process.env.TESTNET_NODE; }

    const response = await (await fetch(nodeUrl, options)).json();

    console.log('Send To ToAddress Response: %o', {
      response,
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

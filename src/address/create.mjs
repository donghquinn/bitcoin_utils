import fetch from 'node-fetch';
import bitcoin from 'bitcoinjs-lib';
import { ECPair } from './base.mjs';
import { toBasicAuth } from '../common/common.mjs';
import { generateSeedandXpriv } from './base.mjs';

export const isValidAddress = async (address, networkType) => {
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
      method: 'validateaddress',
      jsonrpc: '1.0',
      params: [address],
    }),
  };

  let nodeUrl;

  if (networkType === "main") nodeUrl = process.env.MAINNET_NODE;
  if (networkType === "test") nodeUrl = process.env.TESTNET_NODE;

  const response = await (await fetch(nodeUrl, options)).text();

  const isValid = JSON.parse(response);
  // const isValid = JSON.parse(await response.text());

  console.log('Validate Response: %o', {
    isValid: isValid.result.isvalid,
  });

  if (isValid.result.isvalid === false) {
    throw new Error('Invalid Address');
  }
  // const isValid = JSON.parse(await response.text());

  return isValid.result.isvalid;
};

// 주소 생성 및 암호화 된 시드 값 리턴
export const createAddress = async (menemonic, networkType) => {
  const { xpriv, networkType } = generateSeedandXpriv(menemonic, networkType);

  const wif = xpriv.toWIF();
  const { publicKey, privateKey } = ECPair.fromWIF(
    wif,
    networkType,
  );

  const payment = bitcoin.payments.p2pkh({
    pubkey: publicKey,
    network: networkType,
  });

  console.log('Address: %o', {
    address: payment.address,
    privateKey: privateKey.toString('hex'),
    publicKey: publicKey.toString('hex'),
    wif,
  });

  await isValidAddress(payment.address);

  // TODO wif 값 벌트에 저장

  const results = {
    address: payment.address,
    wif,
  };

  return results;
};

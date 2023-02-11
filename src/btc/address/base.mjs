import { BIP32Factory } from 'bip32';
import { ECPairFactory } from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import bip39 from 'bip39';
import bitcoin from 'bitcoinjs-lib';

// BIP32 관련 메서드 호출
export const bip32 = BIP32Factory(ecc);

export const ECPair = ECPairFactory(ecc);

export const generateSeedandXpriv = (mnemonic, network) => {

  let networkType;

  if (network === "test") networkType = bitcoin.networks.testnet;

  if (network === "main") networkType = bitcoin.networks.bitcoin;


  console.log('NETWORK TYPE: %o', { networkType });

  const seed = bip39.mnemonicToSeedSync(mnemonic);

  const xpriv = bip32.fromSeed(seed, networkType);

  return { xpriv, networkType };
};

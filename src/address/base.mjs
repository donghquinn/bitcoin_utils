import { BIP32Factory } from 'bip32';
import { ECPairFactory } from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import bip39 from 'bip39';
import bitcoin from 'bitcoinjs-lib';

// BIP32 관련 메서드 호출
export const bip32 = BIP32Factory(ecc);

export const ECPair = ECPairFactory(ecc);

export const generateSeedandXpriv = mnemonic => {
  const testnet = bitcoin.networks.testnet;

  console.log('NETWORK: %o', { testnet });

  const seed = bip39.mnemonicToSeedSync(mnemonic);

  const xpriv = bip32.fromSeed(seed, testnet);

  return { seed, xpriv };
};

import { bip32 } from './base.mjs';
import bip39 from 'bip39';

// 요청으로 니모닉 값을 받아서 wif(PrivateKey) 추출
export const restoreAddress = mnemonic => {
  const isValid = bip39.validateMnemonic(mnemonic);

  if (!isValid) {
    throw new Error('Invalid Mnemonic');
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic);

  const xpriv = bip32.fromSeed(seed);

  const wif = xpriv.toWIF();

  return wif;
};

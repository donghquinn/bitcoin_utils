import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import bip39 from 'bip39';

// BIP32 관련 메서드 호출
export const bip32 = BIP32Factory(ecc);

export const generateSeed = (mnemonic: string) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);

  return { seed };
};

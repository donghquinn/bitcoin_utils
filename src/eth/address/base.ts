import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';

// BIP32 관련 메서드 호출
export const bip32 = BIP32Factory(ecc);

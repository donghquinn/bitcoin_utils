import { ECPair } from "../address/base.mjs";

export const toBasicAuth = (username, password) => {
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
};

export const validator = (
  pubkey,
  msghash,
  signature
) => ECPair.fromPublicKey(pubkey).verify(msghash, signature);

export const satoshiConverter = (value) => {
  return value / 10 ** 9;
};

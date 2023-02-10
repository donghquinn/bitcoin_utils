import bitcoin from "bitcoinjs-lib";
import { ECPair } from "../address/base.mjs";
import { regtestUtils } from "../regtest/setting.mjs";

/**
 * payment: bitcoin.payments.p2ms({
 *       m,
 *       pubkeys: keys.map((key) => key.publicKey).sort((a, b) => a.compare(b)),
 *       network,
 *     });
 */

const ecPair = ECPair;
const regtest = regtestUtils.network;

export function createPayment(
  _type,
  network,
  myKeys,
) {
  network = network || regtest;
  const splitType = _type.split("-").reverse();
  const isMultisig = splitType[0].slice(0, 4) === "p2ms";
  const keys = myKeys || [];
  let m;
  if (isMultisig) {
    const match = splitType[0].match(/^p2ms\((\d+) of (\d+)\)$/);
    m = parseInt(match[1], 10);
    let n = parseInt(match[2], 10);
    if (keys.length > 0 && keys.length !== n) {
      throw new Error("Need n keys for multisig");
    }
    while (!myKeys && n > 1) {
      keys.push(ecPair.makeRandom({ network }));
      n--;
    }
  }
  if (!myKeys) keys.push(ecPair.makeRandom({ network }));

  let payment;
  splitType.filter((type) => {
    if (type.slice(0, 4) === "p2ms") {
      payment = bitcoin.payments.p2ms({
        m,
        pubkeys: keys.map((key) => key.publicKey).sort((a, b) => a.compare(b)),
        network,
      });
    } else if (["p2sh", "p2wsh"].indexOf(type) > -1) {
      payment = (bitcoin.payments)[type]({
        redeem: payment,
        network,
      });
    } else {
      payment = (bitcoin.payments)[type]({
        pubkey: keys[0].publicKey,
        network,
      });
    }
  });

  return {
    payment,
    keys,
  };
}

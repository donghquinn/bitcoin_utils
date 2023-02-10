import { regtestUtils } from "../regtest/setting.mjs";

// const regtest = regtestUtils.network;

function getWitnessUtxo(out) {
  delete out.address;
  out.script = Buffer.from(out.script, "hex");
  return out;
}

/**
 *
 * @param amount
 * @param payment
 * @param isSegwit
 * @param redeemType
 *
 * @returns hash string of txid or Buffer of tx hash. (txid and hash are reverse order)
 * @returns index the output index of the txo you are spending
 * @returns nonWitnessUtxo the full previous transaction as a Buffer
 */
export async function getInputData(
  amount,
  payment,
  isSegwit,
  redeemType
) {
  try {
    const unspent = await regtestUtils.faucetComplex(payment.output, amount);

    const utx = await regtestUtils.fetch(unspent.txId);

    // for non segwit inputs, you must pass the full transaction buffer
    const nonWitnessUtxo = Buffer.from(utx.txHex, "hex");
    // for segwit inputs, you only need the output script and value as an object.
    const witnessUtxo = getWitnessUtxo(utx.outs[unspent.vout]);
    const mixin = isSegwit ? { witnessUtxo } : { nonWitnessUtxo };
    const mixin2 = {};
    switch (redeemType) {
      case "p2sh":
        mixin2.redeemScript = payment.redeem.output;
        break;
      case "p2wsh":
        mixin2.witnessScript = payment.redeem.output;
        break;
      case "p2sh-p2wsh":
        mixin2.witnessScript = payment.redeem.redeem.output;
        mixin2.redeemScript = payment.redeem.output;
        break;
    }
    return {
      hash: unspent.txId,
      index: unspent.vout,
      ...mixin,
      ...mixin2,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

}

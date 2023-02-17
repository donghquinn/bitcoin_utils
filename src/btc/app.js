import { config } from "dotenv";
import { getAddressBalance } from './address/balance.mjs';
import { createAddress } from "./address/create.mjs";
import { generateMnemonic } from "./address/mnemonic.js";
import { createTransaction } from "./transaction/create.mjs";
import { getLists } from "./transaction/list.mjs";
import { sendToAddress } from "./transaction/send.mjs";

config();

/**
 * @param {*} fromAddress string
 * @param {*} wif string
 * @param {*} toAddress string
 * @param {*} value number
 * @param {*} fee number
 * @param {*} networkType main | test
 */
const test = async (fromAddress, wif, value, fee, networkType) => {
  try {
    const mnemonic = generateMnemonic();

    // const { seed } = generateSeedandXpriv(mnemonic);

    const { address } = await createAddress(mnemonic, networkType);

    const balance = await getAddressBalance(address, networkType)

    const { script, index, txid, hex } = await getLists(address, networkType);

    // TODO WIF 관리 (저장 위치 등)
    const transaction = await createTransaction(fromAddress, value, balance, fee, wif, address, script, index, txid, hex, networkType);

    await sendToAddress(transaction, networkType);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

await test("mgLnLKYWdNZefhDikv1B5V8CCSBT1ec27d", "cQRSUbyZdnZ2PCqCwPDuxN8rsF9GAc7AKRXLyuSY15bGr6ogGjDi", 1, 1, "test")

/**
 * mnemonic - 완료
 * createAddress - 완료
 * transactionList - 완료
 * createTransaction - 진행중...nonWitnessUtxo 이슈 / 서명 이슈
 */
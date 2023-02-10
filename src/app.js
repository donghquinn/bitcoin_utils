import { config } from "dotenv";
import { generateSeedandXpriv } from "./address/base.mjs";
import { createAddress } from "./address/create.mjs";
import { generateMnemonic } from "./address/mnemonic.mjs";
import { getLists } from "./transaction/list.mjs";
import { sendToAddress } from "./transaction/send.mjs";
import { createTransaction } from "./transaction/create.mjs";

config();

const test = async () => {
  try {
    const mnemonic = generateMnemonic();

    const { seed } = generateSeedandXpriv(mnemonic);

    const address = await createAddress(mnemonic);

    const { script1, voutTx1Index, script2, voutTx2Index, txid, hex } = await getLists(address);

    const transaction = await createTransaction("n1NvevFeaYgFmBL15BrSvzVjP47HBuMWS6", 100, "cSWKxuTdkxSvoP15Jasc1EJrEb8R89qZmK6nPPwyscwRq6wPNwHe", address, script1, script2, txid, hex);

    // await sendToAddress(transaction);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

await test();
/**
 * mnemonic - 완료
 * createAddress - 완료
 * transactionList - 완료
 * createTransaction - 진행중...nonWitnessUtxo 이슈 / 서명 이슈
 */
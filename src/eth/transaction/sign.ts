import { web3Base } from "eth/common/base";
import { RawTransaction } from "eth/types/rawtx.types";

export const signTransaction = async (transaction: RawTransaction, privateKey: string) => {
  const web3 =  web3Base();

  const signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKey);

  return signedTransaction;
}

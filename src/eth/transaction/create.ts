import { web3Base } from "eth/common/base"
import { RawTransaction } from "eth/types/rawtx.types";

export const createTransaction = async (fromAddress: string, toAddress: string, value: number): Promise<RawTransaction> => {
  const web3 = web3Base();

  const rawTransaction: RawTransaction  = {
    to: toAddress,
    from: fromAddress,
    value,
    gas: 0,
  };

  const gas = await web3.eth.estimateGas(rawTransaction);

  rawTransaction.gas = gas;

  return rawTransaction;
};

import { web3Base } from "eth/common/base"


export const createTransaction = async (fromAddress: string, toAddress: string, value: number) => {
  const web3 = web3Base();

  const rawTransaction  = {
    to: toAddress,
    from: fromAddress,
    value,
    gas: 0,
  };

  const gas = await web3.eth.estimateGas(rawTransaction);

  rawTransaction.gas = gas;

  return rawTransaction;
};

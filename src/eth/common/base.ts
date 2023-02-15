import Web3 from 'web3';

export const web3Base = () => {
  const rpcUrl = process.env.ETH_RPC_URL!
  const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl, {timeout: 30000}));

  return web3;
}
import Web3 from 'web3';

export const web3Base = () => {
  const web3 = new Web3(new Web3.providers.HttpProvider("https://nebtc-test-rpc.zetra.kr"));

  return web3;
}
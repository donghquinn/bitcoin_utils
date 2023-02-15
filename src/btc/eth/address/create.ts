import Web3 from 'web3';
import { generateMnemonic } from './mnemonic';
import { generateSeed } from './seed';
import { web3Base } from 'eth/common/base';

export const createAddress = () => {
  const web3 = web3Base();
  
  const mnemonic = generateMnemonic();

  const { seed } = generateSeed(mnemonic);

  const bufferSeed = seed.toString('hex');

  const address = web3.eth.accounts.create(bufferSeed);

  return address;
}
import Web3 from 'web3';
import { generateMnemonic } from './mnemonic';
import { generateSeed } from './seed';


export const createAddress = ()=>{
  const web3 = new Web3();
  
  const mnemonic = generateMnemonic();

  const { seed } = generateSeed(mnemonic);

  const bufferSeed = seed.toString('hex');

  const address = web3.eth.accounts.create(bufferSeed);

  return address;
}
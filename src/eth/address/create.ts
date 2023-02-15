import { web3Base } from 'eth/common/base';
import { generateSeed } from './base';

export const createAddress = (mnemonic: string) => {
  const web3 = web3Base();

  const { seed } = generateSeed(mnemonic);

  const bufferSeed = seed.toString('hex');

  const {address, privateKey} = web3.eth.accounts.create(bufferSeed);

  return {address, privateKey};
}

import bip39 from 'bip39';

export const generateMnemonic = () => {
  bip39.setDefaultWordlist('korean');

  const mnemonic = bip39.generateMnemonic();

  const isValid = bip39.validateMnemonic(mnemonic);

  if (!isValid) {
    throw new Error('Invalid Mnemonic');
  }

  return mnemonic;
};

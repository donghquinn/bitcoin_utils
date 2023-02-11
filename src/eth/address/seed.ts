import bip39 from 'bip39';

export const generateSeed = (mnemonic: string) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);

  return { seed };
};

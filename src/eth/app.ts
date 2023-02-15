import { createAddress } from "./address/create";
import { generateMnemonic } from "./address/mnemonic"

const addressTest = () => {
  const mnemonic = generateMnemonic();
  console.log("mnemonic: %o", {mnemonic});

  const address = createAddress(mnemonic);

  console.log("Created Address: %o", {address});

};

addressTest();
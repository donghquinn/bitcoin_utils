import { add } from "winston";
import { createAddress } from "./address/create";
import { generateMnemonic } from "./address/mnemonic"
import { createTransaction } from "./transaction/create";

const addressTest = () => {
  const mnemonic = generateMnemonic();
  console.log("mnemonic: %o", {mnemonic});

  const {address, privateKey} = createAddress(mnemonic);

  console.log("Created Address: %o", {address, privateKey});

  const transaction = createTransaction(address, "0x1CdF6a5E874F6cbC164DcF515407Cc3a7baA6d37", 1 );

  console.log("Created Transaction: %o", {transaction});
};

addressTest();
import fetch from 'node-fetch';

export const getAddressBalance = async (address, networkType) => {
  let url;
  let route;

  console.log("main and testnet: %o", {
    main: process.env.MAINNET_BITAPS_API,
    test: process.env.TESTNET_BITAPS_API,
  });

  if (networkType === "main") {
    url = process.env.MAINNET_BITAPS_API;
    console.log("mainnet url: %o", { url });

    route = process.env.BTC_ADDR_ROUTE;
  }

  if (networkType === "test") {
    url = process.env.TESTNET_BITAPS_API;
    console.log("mainnet url: %o", { url });

    route = process.env.BTC_ADDR_ROUTE;
  }

  if (networkType === "qcity") {
    url = process.env.QCITY_URL;

    route = process.env.QCITY_ADDR_ROUTE;
  }

  const requestUrl = `${url}${route}/${address}`;

  const options = {
    method: 'GET',
  };

  const response = await (await fetch(requestUrl, options)).text();

  const responseData = JSON.parse(response);

  // if (responseData.data === undefined || responseData.data === null) {
  //   console.log(responseData);

  //   return;
  // }

  const balance = responseData.data.balance;

  console.log('Balance: %o ', { balance });

  return balance;
};

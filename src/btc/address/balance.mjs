import fetch from 'node-fetch';

export const getAddressBalance = async (address, networkType) => {
  let url;

  if (networkType === "main") {
    url = process.env.MAINNET_BITAPS_API;
  }

  if (networkType === "test") {
    url = process.env.TESTNET_BITAPS_API;
  }


  const route = process.env.BTC_ADDR_ROUTE;

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

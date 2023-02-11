import fetch from 'node-fetch';

export const getAddressBalance = async address => {
  const url = process.env.TESTNET_BITAPS_API;
  const route = '/address/state';

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

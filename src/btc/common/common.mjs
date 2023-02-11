export const toBasicAuth = (username, password) => {
  return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
};

export const satoshiConverter = value => {
  return value / 10 ** 9;
};

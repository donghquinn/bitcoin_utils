import Web3 from 'web3';

const createAddress = ()=>{
  const web3 = new Web3();

  const address = web3.eth.accounts.create();
}
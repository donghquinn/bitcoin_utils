import bitcoin from 'bitcoinjs-lib';
import bitcore from 'bitcore-lib';
import { ECPair } from '../address/base.mjs';

/**
 * @param {*} fromAddress 출금 주소
 * @param {*} value 보낼 코인 수량
 * @param {*} balance 조회한 전체 잔액 값
 * @param {*} fee 수수료
 * @param {*} wif privateKey를 가져올 때 사용하는 포맷
 * @param {*} toAddress 수신 주소
 * @param {*} script 사용할 이전 트랜잭션의 아웃풋의 잠금 해제를 위한 스크립트
 * @param {*} index 사용할 이전 트랜잭션의 아웃풋의 인덱스
 * @param {*} txid 이전 트랜잭션의 txID
 * @param {*} hex 이전 트랜잭션을 hex값으로 인코딩한 연속적 숫자
 * @returns 트랜잭션 해시 값
 */
export const createTransaction = async (
  fromAddress,
  value,
  balance,
  fee,
  wif,
  toAddress,
  script,
  index,
  txid,
  hex,
) => {
  try {
    console.log('Parameters: %o', {
      fromAddress,
      value,
      toAddress,
      script,
      txid,
      hex,
    });

    const signer = ECPair.fromWIF(wif, bitcoin.networks.testnet);
    const privateKey = signer.privateKey.toString('hex');

    console.log('privateKey: %o', {
      privateKey: signer.privateKey.toString('hex'),
    });

    const utxo = {
      txId: txid,
      outputIndex: index,
      address: fromAddress,
      script,
      satoshis: balance,
    };

    console.log('UTXO: %o', { utxo });

    const tx = new bitcore.Transaction();

    // Unspent value is different from specified fee: Unspent value is 1893099 but specified fee is 158
    // 라는 것은 아웃풋과 수수료를 합치면 balance와 값이 동일해야 하는데, 아니라는 의미다.

    // Dust amount detected in one output
    // 이건 너무 적은 전송 값과 그보다 큰 수수료로 인해 발생한 이슈이다. 따라서 더 높은 값과 수수료를 설정해야 한다.
    // 즉 dust transaction은 너무 작은 트랜잭션(먼지와도 같이 미미한 트랜잭션)이라 판단하여 리젝
    tx.from(utxo)
      .to(toAddress, value)
      .change(fromAddress)
      .fee(fee)
      .sign(privateKey);

    const isValid = tx.verify();

    console.log('Is Valid Tx: %o', { isValid });

    if (!isValid) {
      throw new Error('Invalid Transaction');
    }

    const transaction = tx.serialize();

    console.log('Transaction :%o', { transaction });

    return transaction;
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

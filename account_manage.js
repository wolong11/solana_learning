// 1.账户管理
// 创建新的 Solana 账户并查询余额

// 导入所需的模块
const web3 = require('@solana/web3.js');
const bs58 = require('bs58');

// 创建一个新的连接到 devnet 的连接对象
const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

// 创建一个新的账户
const newAccount = web3.Keypair.generate();

// 打印新账户的私钥和地址
console.log('新账户的私钥(数组格式):', newAccount.secretKey.toString());
console.log('新账户的私钥:', bs58.encode(newAccount.secretKey));
console.log('新账户的地址:', bs58.encode(newAccount.publicKey.toBuffer()));

// 查询新账户的余额
async function checkBalance() {
    const balance = await connection.getBalance(newAccount.publicKey);
    console.log('账户余额:', balance / web3.LAMPORTS_PER_SOL);
}

checkBalance().catch(console.error);


// 1新账户的私钥: 2A2oWTTcqosSn5RW1w97FXBj4VqRPwMbcJ2uEZWNcZ8wrhWc8ic8mRxhf2uMtVBMshAHu5hLygFM6oyopghNeJK6
// 1新账户的地址: 3TrzGmw5pCwDBch6KJJhbi6zt18eNDukgChpeyGbgZYx

// 2新账户的私钥: 2cN5uU8FcMdLWK2QFLWVjWEAUsCQ2mFyZpC2wkcTYwwP3sc6RCsJ6vDdWJcGrTkb5YUc26v3mLnth1UEdEUpdSR4
// 2新账户的地址: 6ZH1eoyVT7dNEf63jYqAf7ifbFbPQFGkc58432AJoh9Q



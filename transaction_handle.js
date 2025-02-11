// 2.交易处理
// 构建、签名和发送交易

// 导入所需的模块
const web3 = require('@solana/web3.js');
const bs58 = require('bs58');

// 创建一个新的连接到 devnet 的连接对象
const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

// 导入发送方和接收方的账户
const sender = web3.Keypair.fromSecretKey(bs58.decode('2A2oWTTcqosSn5RW1w97FXBj4VqRPwMbcJ2uEZWNcZ8wrhWc8ic8mRxhf2uMtVBMshAHu5hLygFM6oyopghNeJK6'));
const receiver = web3.Keypair.fromSecretKey(bs58.decode('2cN5uU8FcMdLWK2QFLWVjWEAUsCQ2mFyZpC2wkcTYwwP3sc6RCsJ6vDdWJcGrTkb5YUc26v3mLnth1UEdEUpdSR4'));

// 打印发送方和接收方的账户地址
console.log('发送方账户地址:', sender.publicKey.toBase58());
console.log('接收方账户地址:', receiver.publicKey.toBase58());

// 查询发送方账户余额
async function checkSenderBalance() {
    const senderBalance = await connection.getBalance(sender.publicKey);
    console.log('发送方账户余额:', senderBalance / web3.LAMPORTS_PER_SOL);
}
checkSenderBalance();


// 构建和发送交易
async function sendTransaction() {
    let transaction = new web3.Transaction();

    // 获取最新的 blockhash
    const latestBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = latestBlockhash.blockhash;

    // 构建交易
    let instruction = web3.SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: receiver.publicKey,
        lamports: web3.LAMPORTS_PER_SOL * 0.01,
    });

    transaction.add(instruction);
    transaction.feePayer = sender.publicKey;
    // console.log("交易hash:", transaction.hash.toBase58());
    console.log("交易:", transaction);

    // 发送交易
    let sinature = await web3.sendAndConfirmTransaction(connection, transaction, [sender]);
    console.log('交易签名:', sinature);
}

sendTransaction().catch(console.error);




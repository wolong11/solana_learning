const axios = require('axios');
const fs = require('fs');  // 引入文件系统模块

async function getNodes() {
    try {
        const response = await axios.post('http://api.mainnet-beta.solana.com', {
            jsonrpc: '2.0',
            id: 1,
            method: 'getClusterNodes'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // 保存所有节点数据到 1.json
        fs.writeFileSync('1.json', JSON.stringify(response.data, null, 2), 'utf8');
        console.log('所有节点数据已保存到 1.json 文件');

        // 筛选出 rpc 不为 null 的节点
        const rpcNodes = response.data.result.filter(node => node.rpc !== null);
        
        // 保存 rpc 节点数据到 2.json
        fs.writeFileSync('2.json', JSON.stringify(rpcNodes, null, 2), 'utf8');
        console.log('RPC 节点数据已保存到 2.json 文件');
        console.log('RPC 节点数量:', rpcNodes.length);

    } catch (error) {
        console.error('请求失败:', error.message);
    }
}

getNodes();
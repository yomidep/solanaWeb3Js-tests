import { Connection } from '@solana/web3.js';

const connection = new Connection(
    "https://solana-mainnet.g.alchemy.com/v2/aleYeT5BI1MFFXJw37SiYu_FdeYMaMqb"
);

const fetchBlocks = async () => {
    const blocks = await connection.getBlocks(0);
    // Convert to Uint8Array if necessary
    const blocksUint8Array = new Uint8Array(blocks);
    // Decode to string
    const blocksString = new TextDecoder().decode(blocksUint8Array);
    console.log(blocksString);
};

fetchBlocks();

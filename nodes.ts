import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection(
    "https://solana-mainnet.g.alchemy.com/v2/aleYeT5BI1MFFXJw37SiYu_FdeYMaMqb"
);

const fetchNodes = async () => {
    try {
        const public_key = new PublicKey("7atgF8KQo4wJrD5ATGX7t1V2zVvykPJbFfNeVf1icFv1")
        // Await the promise to get the cluster nodes
        const nodes = await connection.getSignaturesForAddress(public_key);
        console.log(nodes);
    } catch (error) {
        console.error("Error fetching cluster nodes:", error);
    }
};

fetchNodes();

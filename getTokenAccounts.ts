import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, AccountLayout } from '@solana/spl-token';

const pubkey = new PublicKey('8R8eZLAvB5A9QyByszPZ7bVJsBkdAPU1CYmpAHrdBG97');
const connection = new Connection('https://solana-mainnet.g.alchemy.com/v2/aleYeT5BI1MFFXJw37SiYu_FdeYMaMqb');

const fetchTokenAccounts = async () => {
    const tokenAccounts = await connection.getTokenAccountsByOwner(pubkey, {
        programId: TOKEN_PROGRAM_ID
    });

    console.log('Raw response:', tokenAccounts);

    // Process each token account
    tokenAccounts.value.forEach((tokenAccount) => {
        const accountData = AccountLayout.decode(tokenAccount.account.data);

        console.log('Token Account:', tokenAccount.pubkey.toBase58());
        console.log('  Token Mint:', new PublicKey(accountData.mint).toBase58());
        console.log('  Owner:', new PublicKey(accountData.owner).toBase58());
        console.log('  Balance:', accountData.amount.toString());
        console.log('------------------------');
    });
};

fetchTokenAccounts();
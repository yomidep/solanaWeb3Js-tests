    import {
        Keypair,
        Connection,
        Transaction,
        SystemProgram,
        TransactionInstruction,
        PublicKey,
        clusterApiUrl,
        sendAndConfirmTransaction,
    } from "@solana/web3.js";
    import * as fs from 'fs';

    // Read wallet data synchronously
    const walletData = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'));

    async function createAccount(connection: Connection, feePayer: Keypair, programId: PublicKey): Promise<Keypair> {
        const newAccountKeypair = Keypair.generate();
        const createAccountTx = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: feePayer.publicKey,
                newAccountPubkey: newAccountKeypair.publicKey,
                lamports: 1e8, // 0.1 SOL
                space: 10,
                programId: programId,
            })
        );

        await sendAndConfirmTransaction(connection, createAccountTx, [feePayer, newAccountKeypair]);
        console.log(`Created account: ${newAccountKeypair.publicKey.toBase58()}`);
        return newAccountKeypair;
    }

    async function closeAccount(connection: Connection, feePayer: Keypair, accountToClose: Keypair, programId: PublicKey) {
        const closeAccountTx = new Transaction().add(
            new TransactionInstruction({
                keys: [
                    {
                        pubkey: accountToClose.publicKey,
                        isSigner: false,
                        isWritable: true,
                    },
                    {
                        pubkey: feePayer.publicKey,
                        isSigner: false,
                        isWritable: true,
                    },
                ],
                programId: programId,
            })
        );

        await sendAndConfirmTransaction(connection, closeAccountTx, [feePayer]);
        console.log(`Closed account: ${accountToClose.publicKey.toBase58()}`);
    }

    (async function () {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const feePayer = Keypair.fromSecretKey(new Uint8Array(walletData));
        const programId = new PublicKey("EBYtBkYsFDHUAJbn2bf1rupPd8DVxYhMxFuxnSNvXpE4");

        const numberOfAccounts = 5; // Change this to create more or fewer accounts
        const accounts: Keypair[] = [];

        // Create multiple accounts
        for (let i = 0; i < numberOfAccounts; i++) {
            const account = await createAccount(connection, feePayer, programId);
            accounts.push(account);
        }

        // Wait for a moment to ensure all accounts are created
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Close all created accounts
        for (const account of accounts) {
            await closeAccount(connection, feePayer, account, programId);
        }

        console.log("All accounts created and closed successfully.");
    })();
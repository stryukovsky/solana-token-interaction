import * as web3 from "@solana/web3.js";
import {transfer, getOrCreateAssociatedTokenAccount} from "@solana/spl-token";
import { secretKey } from "./secretKey.asset.js";
import { tokenFilename, accountFilename } from "./filename.asset.js";
import * as fs from "fs";

const main = async () => {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "processed");

    const payer = web3.Keypair.fromSecretKey(Uint8Array.from(secretKey));
    const mintPubKey = fs.readFileSync(tokenFilename).toString();
    const mint = new web3.PublicKey(mintPubKey);

    const accountPubKey = fs.readFileSync(accountFilename).toString();
    const senderTokenAccountAddress = new web3.PublicKey(accountPubKey);
    
    const recipient = web3.Keypair.generate();
    const recipientAssociatedAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mint, recipient.publicKey);
    const recipientTokenAccountAddress = recipientAssociatedAccount.address;

    const sender = payer;
    const amount = 10;
    
    const signature = await transfer(connection, sender, senderTokenAccountAddress, recipientTokenAccountAddress, sender.publicKey, amount);
    console.log(`Sent from ${sender.publicKey} to ${recipient.publicKey} ${amount} of token ${mint}: ${signature}`);
}

main().catch(console.error);

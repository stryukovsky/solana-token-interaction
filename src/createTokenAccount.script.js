import * as web3 from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import {secretKey} from "./secretKey.asset.js";
import {tokenFilename, accountFilename} from "./filename.asset.js";
import * as fs from "fs";


const main = async () => {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "processed");
    const signer = web3.Keypair.fromSecretKey(Uint8Array.from(secretKey));
    const mint = new web3.PublicKey(fs.readFileSync(tokenFilename).toString());

    const payer = signer;
    const owner = signer.publicKey;
    const account = await getOrCreateAssociatedTokenAccount(connection, payer, mint, owner);
    const address = account.address.toBase58();
    console.log(`Account ${address} with balance ${account.amount}`);
    fs.writeFileSync(accountFilename, address);
}

main().catch(console.error);

import * as web3 from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";
import { secretKey } from "./secretKey.asset.js";
import { tokenFilename, accountFilename } from "./filename.asset.js";
import * as fs from "fs";

const main = async () => {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "processed");
    const signer = web3.Keypair.fromSecretKey(Uint8Array.from(secretKey));

    let mintPubKey = fs.readFileSync(tokenFilename).toString();
    let mint = new web3.PublicKey(mintPubKey);

    const recipientPubKey = fs.readFileSync(accountFilename).toString();
    const recipient = new web3.PublicKey(recipientPubKey);

    const payer = signer;
    const authority = signer.publicKey;
    const amount = web3.LAMPORTS_PER_SOL * 3;

    const mintResult = await mintTo(connection, payer, mint, recipient, authority, amount);
    console.log(`${amount} tokens ${mint} minted to ${recipient} by ${payer.publicKey} authorized ${authority}. Tx: ${mintResult}`);
}

main().catch(console.error);

import * as web3 from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import { secretKey } from "./secretKey.asset.js";
import * as fs from "fs";

const DECIMALS = 9;
export const FILENAME = "token.pub";

const main = async () => {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "processed");
    const signer = web3.Keypair.fromSecretKey(Uint8Array.from(secretKey));
    const mint = await createMint(connection, signer, signer.publicKey, signer.publicKey, DECIMALS);
    const mintKey = mint.toBase58();
    fs.writeFile(FILENAME, mintKey, () => {
        console.log(`Written ${mintKey} to ${FILENAME}`);
    });
}

main().catch(console.error);

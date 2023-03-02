import * as  web3 from "@solana/web3.js";
import { secretKey } from "./secretKey.asset.js";

const main = async () => {
    const signer = web3.Keypair.fromSecretKey(Uint8Array.from(secretKey));
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "processed");
    const airdrop = await connection.requestAirdrop(signer.publicKey, web3.LAMPORTS_PER_SOL);
    console.log(`Airdrop performed to ${signer.publicKey} (${airdrop})`);
}

main().catch(console.error);

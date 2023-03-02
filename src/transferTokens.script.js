import * as web3 from "@solana/web3.js";
import {transfer} from "@solana/spl-token";
import { secretKey } from "./secretKey.asset.js";
import { tokenFilename, accountFilename } from "./filename.asset";
import * as fs from "fs";

const main = async () => {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "processed");

    const payer = web3.Keypair.fromSecretKey(Uint8Array.from(secretKey));
    const mintPubKey = fs.readFileSync(tokenFilename).toString();
    const mint = new web3.PublicKey(mintPubKey);

    const accountPubKey = fs.readFileSync(accountFilename).toString();
    const account = new web3.PublicKey(accountPubKey);
    
    const recipient = account;
}

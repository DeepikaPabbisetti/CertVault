// To connect to CertVault database

import sqlite3 from "sqlite3"
import { open } from "sqlite"

export async function connectDb()
{
    try
    {
        const db = await open({filename: "CertVault.db", driver: sqlite3.Database});
        return db;
    }
    catch(error)
    {
        console.log("Unable to connect to database!");
        return error;
    }
}

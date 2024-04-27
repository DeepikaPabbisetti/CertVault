import sqlite3 from "sqlite3"
import { open } from "sqlite"
import express from "express"
import cors from "cors"

const db = await connectDb();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/:employeeId/certs", async function(request, response) 
{
    const employeeId = request.params.employeeId;
    const sortOrder = request.query.sort || "ASC";
    const sortBy = request.query.sortBy || "ExpiryDate";
    const [result, responseCode] = await getCerts(employeeId, sortOrder, sortBy);
    response.status(responseCode).send(result);
});

app.post("/api/:employeeId/certs", async function(request, response)
{
    const employeeId = request.params.employeeId;
    const cert = request.body;
    let [result, responseCode] = await addCert(employeeId, cert);
    response.status(responseCode).send(result);
});

app.put("/api/:employeeId/certs/:credentialId", async function(request, response)
{
    let employeeId = request.params.employeeId;
    let credentialId = request.params.credentialId;
    let cert = request.body;
    let [result, responseCode] = await updateCert(employeeId, credentialId, cert);
    response.status(responseCode).send(result);
})

app.delete("/api/:employeeId/certs/:certId", async function(request, response)
{
    const employeeId = request.params.employeeId;
    const certId = request.params.certId;
    let [result, responseCode] = await deleteCert(employeeId,certId);
    response.status(responseCode).send(result);
})

async function connectDb()
{
    const db = await open({filename: "CertVault.db", driver: sqlite3.Database});
    return db;
}

async function getCerts(employeeId, sortOrder, sortBy)
{
    let certs, response, responseCode = 500;
    const selectQuery = `SELECT CredentialId, CertName, Issuer, IssuedDate, ExpiryDate, CredentialUrl FROM certifications WHERE EmployeeId=? ORDER BY ${sortBy} ${sortOrder}`;
    try
    {
        certs = await db.all(selectQuery, employeeId);
        response = ({Certs: certs});
        if (certs)
        {
            responseCode = 200;
        }
        else
        {
            responseCode = 204;
        }
    }
    catch(error)
    {
        response = ({Error: {Code: error.code}, Message: error.message});
    }
    return [response, responseCode];
}

async function addCert(employeeId, cert) 
{ 
    let insertQuery = `INSERT INTO Certifications(EmployeeId, CredentialId, CertName, Issuer, IssuedDate, ExpiryDate, CredentialUrl) VALUES(?, ?, ?, ?, ?, ?, ?)`;
    let response, responseCode = 500;
    try 
    {
        const result = await db.run(insertQuery, [employeeId, cert.CredentialId, cert.CertName, cert.Issuer, cert.IssuedDate, cert.ExpiryDate, cert.CredentialUrl]);
        if (result.changes == 1)
        {
            const insertedCert = await getAffectedRow(employeeId, cert.CredentialId);
            if (insertedCert)
            {
                responseCode = 201;
                response = ({InsertedCert: insertedCert, Status: "Certificate added successfully."})
            }
        }
    } 
    catch(error)
    {
        response = ({Error: {Code: error.code, Message: error.message}});
    }
    return [response, responseCode]
}

async function updateCert(employeeId, credentialId, cert)
{
    let updateQuery = `UPDATE Certifications SET CredentialId=?, CertName=?, Issuer=?, IssuedDate=?, ExpiryDate=?, CredentialUrl=? WHERE EmployeeId=? AND CredentialId=?`;
    let responseCode = 404, response;
    try
    {
        let result = await db.run(updateQuery, cert.CredentialId, cert.CertName, cert.Issuer, cert.IssuedDate, cert.ExpiryDate, cert.CredentialUrl, employeeId, credentialId);
        if (result.changes == 1)
        {
            let updatedCert = await getAffectedRow(employeeId, cert.CredentialId);
            if (updatedCert)
            {
                responseCode = 200;
                response = ({UpdatedCert: updatedCert, Status: "Certificate updated successfully."});
            }
        }
        else
        {
            response = ({Error: {Code: "Not Found", Message: "Given Certificate not found."}})
        }
    }
    catch(error)
    {
        responseCode = 500;
        response = ({Error: {Code: error.code, Message: error.message}});
    }
    return [response, responseCode];
}

async function deleteCert(employeeId, credentialId)
{
    let deleteQuery = `DELETE FROM Certifications WHERE EmployeeId=? AND CredentialId=?`;
    let responseCode = 404, response;
    try
    {
        let result = await db.run(deleteQuery, [employeeId, credentialId]);
        if (result.changes == 1)
        {
            responseCode = 200;
            response = ({CredentialId: credentialId, Status: "Certificate deleted successfully."});
        }
        else
        {
            response = ({Error: {Code: "Not Found", Message: "Given Certificate not found."}})
        }
    }
    catch(error)
    {
        response = ({Error: {Code: error.code, Message: error.message}});
    }
    return [response, responseCode];
}

async function getAffectedRow(employeeId, credentialId)
{
    let selectQuery = `SELECT CredentialId, CertName, Issuer, IssuedDate, ExpiryDate, CredentialUrl FROM Certifications WHERE EmployeeId=? AND CredentialId=?`;
    try
    {
        let cert = await db.get(selectQuery, [employeeId, credentialId]);
        return cert;
    }
    catch(error)
    {
        return error;
    }
}

app.listen(5000)
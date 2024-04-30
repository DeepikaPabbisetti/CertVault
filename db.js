// To get all the certificates, add the certificate, update the certificate an delete the certificate of an employee

import { connectDb  } from "./dbConnection.js"

const db = await connectDb();
let certNotFound = {Error: {Code: "Not Found", Message: "Given Certificate not found."}};

export async function getCerts(employeeId, sortOrder, sortBy)
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

export async function addCert(employeeId, cert) 
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

export async function updateCert(employeeId, credentialId, cert)
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
            response = certNotFound;
        }
    }
    catch(error)
    {
        responseCode = 500;
        response = ({Error: {Code: error.code, Message: error.message}});
    }
    return [response, responseCode];
}

export async function deleteCert(employeeId, credentialId)
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
            response = certNotFound;
        }
    }
    catch(error)
    {
        response = ({Error: {Code: error.code, Message: error.message}});
    }
    return [response, responseCode];
}

export async function getAffectedRow(employeeId, credentialId)
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



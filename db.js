// To get all the certificates, add the certificate, update the certificate an delete the certificate of an employee

import { connectDb  } from "./connection.js"
import md5 from "md5"
import randomToken from "random-token"

const db = await connectDb();

let certNotFound = {Error: {Code: "Not Found", Message: "Given Certificate not found."}};

export async function validateUserLogin(userName, password)
{
    let passwordHash = md5("2d4r" + password);
    let response, responseCode;
    let selectQuery = "SELECT * FROM User WHERE UserName=? AND Password=?";
    try
    {
        let result = await db.get(selectQuery, [userName, passwordHash]);
        if (result)
        {
            let token = await generateToken();
            let updateStatus = await updateUser(result.EmployeeId, token);
            if (updateStatus == 1)
            {
                response = ({Employee: result.EmployeeId, Token: token});
                responseCode = 200;
            }
        }
        else
        {
            response = ({Status: "Invalid user"});
            responseCode = 404;
        }
    }
    catch(error)
    {
        responseCode = 500;
        response = ({Error: {Code: error.code}, Message: error.message});
    }
}

async function generateToken()
{
    const token = randomToken(14);
    return token;
}

export async function updateUser(employeeId, token)
{
    let updateQuery = `UPDATE user SET Token=? WHERE EmployeeId=?`;
    try
    {
        let result = await db.run(updateQuery, [token, employeeId]);
        return result.changes;
    }
    catch(error)
    {
        return -1;
    }
}

export async function validateToken(token)
{
    let selectQuery = "SELECT EmployeeId from User WHERE Token=?";
    let isTokenValid = false, employeeId = null;
    try
    {
        let result = await db.get(selectQuery, token);
        if (result)
        {
            isTokenValid = true;
            employeeId = result.EmployeeId;
        }
    }
    catch(error)
    {
        console.log(error);
    }
    return [isTokenValid, employeeId];
}

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
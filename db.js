// To get all the certificates, add the certificate, update the certificate an delete the certificate of an employee

import { connectDb  } from "./connection.js"
import md5 from "md5"
import randomToken from "random-token"

const db = await connectDb();

let certNotFound = {Error: {Code: "Not Found", Message: "Given Certificate not found."}};

export async function validateUserLogin(userName, password)
{
    let passwordHash = md5("2d4r" + password);
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
                return {Employee: result.EmployeeId, Token: token};
            }
        }
        else
        {
            return {Status: "Invalid user"};
        }
    }
    catch(error)
    {
        return error;
    }
}


export async function createUser(userName, password, email, employeeId)
{
   const passwordHash = md5('2d4r' + password);
   const insertQuery = "INSERT INTO USER(UserName, Password, EmployeeId, Email) VALUES(?, ?, ?, ?)";
   try
   {
       const result = await db.run(insertQuery, [userName, passwordHash, employeeId, email]);
       return {Status: result.changes};
   }
   catch(error)
   {
       return error;
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
    let certs;
    const selectQuery = `SELECT CredentialId, CertName, Issuer, IssuedDate, ExpiryDate, CredentialUrl FROM certifications WHERE EmployeeId=? ORDER BY ${sortBy} ${sortOrder}`;
    try
    {
        certs = await db.all(selectQuery, employeeId);
        return ({Certs: certs});
    }
    catch(error)
    {
        return error;
    }
}

export async function addCert(employeeId, cert) 
{ 
    const insertQuery = `INSERT INTO Certifications(EmployeeId, CredentialId, CertName, Issuer, IssuedDate, ExpiryDate, CredentialUrl) VALUES(?, ?, ?, ?, ?, ?, ?)`;
    try 
    {
        const result = await db.run(insertQuery, [employeeId, cert.CredentialId, cert.CertName, cert.Issuer, cert.IssuedDate, cert.ExpiryDate, cert.CredentialUrl]);
        if (result.changes == 1)
        {
            const insertedCert = await getAffectedRow(employeeId, cert.CredentialId);
            if (insertedCert)
            {
                return {InsertedCert: insertedCert, Status: "Certificate added successfully."};
            }
        }
    } 
    catch(error)
    {
        return error;
    }
}

export async function updateCert(employeeId, credentialId, cert)
{
    const updateQuery = `UPDATE Certifications SET CredentialId=?, CertName=?, Issuer=?, IssuedDate=?, ExpiryDate=?, CredentialUrl=? WHERE EmployeeId=? AND CredentialId=?`;
    try
    {
        let result = await db.run(updateQuery, cert.CredentialId, cert.CertName, cert.Issuer, cert.IssuedDate, cert.ExpiryDate, cert.CredentialUrl, employeeId, credentialId);
        if (result.changes == 1)
        {
            let updatedCert = await getAffectedRow(employeeId, cert.CredentialId);
            if (updatedCert)
            {
                return ({UpdatedCert: updatedCert, Status: "Certificate updated successfully."});
            }
        }
        else
        {
            return certNotFound;
        }
    }
    catch(error)
    {
        return error;
    }
}

export async function deleteCert(employeeId, credentialId)
{
    let deleteQuery = `DELETE FROM Certifications WHERE EmployeeId=? AND CredentialId=?`;
    try
    {
        let result = await db.run(deleteQuery, [employeeId, credentialId]);
        if (result.changes == 1)
        {
            return {CredentialId: credentialId, Status: "Certificate deleted successfully."};
        }
        else
        {
            return certNotFound;
        }
    }
    catch(error)
    {
        return ({Error: {Code: error.code, Message: error.message}});
    }
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
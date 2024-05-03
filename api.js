// API's to perform CRUD operations on employee certifications

import { getCerts, addCert, updateCert, deleteCert, validateUserLogin, validateToken, createUser } from "./db.js"
import express from "express"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/login", async function(request, response)
{
    let userName = request.body.UserName;
    let password = request.body.Password;
    let result = await validateUserLogin(userName, password);
    let responseCode = 404;
    if (result.Token)
    {
        responseCode = 200;
    }
    response.status(responseCode).send(result);
});

app.post("/api/signup", async function(request, response)
{
    let userName = request.body.UserName;
    let password = request.body.Password;
    let email = request.body.Email;
    let employeeId = request.body.EmployeeId;
    let result = await createUser(userName, password, email, employeeId);
    response.send(result);
})

app.use(async function(request, response, next)
{
    let token = request.headers.token;
    let result = await validateToken(token);
    if (result[0] == true)
    {
        request.employeeId = result[1];
        next();
    }
    else
    {   
        const unauthorizedError = new Error('UnauthorizedUser');
        unauthorizedError.status = 401; 
        next(unauthorizedError); 
    }
});

app.get("/api/certs", async function(request, response) 
{     
    try
    { 
        const employeeId = request.employeeId;
        const sortOrder = request.query.sort || "ASC";
        const sortBy = request.query.sortBy || "ExpiryDate";
        const result = await getCerts(employeeId, sortOrder, sortBy);
        let responseCode = 404;
        if (result.Certs)
        {
            responseCode = 200;
        }
        response.status(responseCode).send(result);
    }
    catch(error)
    {
        response.status(500).send('Internal Server Error');
    }
});

app.post("/api/certs", async function(request, response)
{
    try
    {
        const employeeId = request.employeeId;
        const cert = request.body;
        const result = await addCert(employeeId, cert);
        let responseCode = 404;
        if (result.InsertedCert)
        {
            responseCode = 200;
        }
        response.status(responseCode).send(result);
    }
    catch(error)
    {
        response.status(500).send('Internal Server Error');
    }
});

app.put("/api/certs/:credentialId", async function(request, response)
{
    try
    {
        const employeeId = request.employeeId;
        const credentialId = request.params.credentialId;
        const cert = request.body;
        const result = await updateCert(employeeId, credentialId, cert);
        let responseCode = 404;
        if (result.UpdatedCert)
        {
            responseCode = 200;
        }
        response.status(responseCode).send(result);
    }
    catch(error)
    {
        response.status(500).send(error);
    }
});

app.delete("/api/certs/:credentialId", async function(request, response)
{
    try
    {
        const employeeId = request.employeeId;
        const credentialId = request.params.credentialId;
        const result = await deleteCert(employeeId, credentialId);
        let responseCode = 404;
        if (result.CredentialId)
        {
            responseCode = 200;
        }
        response.status(responseCode).send(result);
    }
    catch(error)
    {
        return response.status(500).send('Internal Server Error');
    }
});

app.listen(5000);
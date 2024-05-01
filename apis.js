// API's to perform CRUD operations on employee certifications

import { getCerts, addCert, updateCert, deleteCert, validateUserLogin, validateToken } from "./db.js"
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
    response.send(result);
});

app.use(async function(request, response, next)
{
    let token = request.headers.token;
    let result = await validateToken(token);
    if (result[0] == true)
    {
        request.employeeId = result[1];
    }
    next();
});

app.get("/api/certs", async function(request, response) 
{              
    const employeeId = request.employeeId;
    const sortOrder = request.query.sort || "ASC";
    const sortBy = request.query.sortBy || "ExpiryDate";
    const [result, responseCode] = await getCerts(employeeId, sortOrder, sortBy);
    response.status(responseCode).send(result);
});

app.post("/api/certs", async function(request, response)
{
    const employeeId = request.employeeId;
    const cert = request.body;
    let [result, responseCode] = await addCert(employeeId, cert);
    response.status(responseCode).send(result);
});

app.put("/api/certs/:credentialId", async function(request, response)
{
    let employeeId = request.employeeId;
    let credentialId = request.params.credentialId;
    let cert = request.body;
    let [result, responseCode] = await updateCert(employeeId, credentialId, cert);
    response.status(responseCode).send(result);
});

app.delete("/api/certs/:credentialId", async function(request, response)
{
    const employeeId = request.employeeId;
    const credentialId = request.params.credentialId;
    let [result, responseCode] = await deleteCert(employeeId, credentialId);
    response.status(responseCode).send(result);
});

app.listen(5000);
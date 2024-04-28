// API's to perform CRUD operations on employee certifications

import { getCerts, addCert, updateCert, deleteCert } from "./db.js"
import express from "express"
import cors from "cors"

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
});

app.delete("/api/:employeeId/certs/:credentialId", async function(request, response)
{
    const employeeId = request.params.employeeId;
    const credentialId = request.params.credentialId;
    let [result, responseCode] = await deleteCert(employeeId, credentialId);
    response.status(responseCode).send(result);
});

app.listen(5000);
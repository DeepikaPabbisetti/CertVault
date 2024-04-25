const express = require("express")
const app = express()
const cors = require('cors');
app.use(cors());

const sqlite3 = require('sqlite');
const db = new sqlite3.Database('D:\\CertVault\\CertVault.db');

app.get("/api/employee/certs", async (req, res) =>
{
    const employeeId = req.headers["employeeid"];
    const certificates = await getCertificates(employeeId);
    console.log(certificates);
    res.send(certificates);
})

app.post("/api/employee/addCert", (req, res) =>
{
    res.send('');
})

app.put("/api/employee/updateCert", (req, res) =>
{
    res.send('');
})

app.delete("/api/employee/deleteCert", (req, res) =>
{
    res.send('');
})

const PORT = 5000
app.listen(PORT, () => 
{
    console.log(`Server is running on port ${PORT}`);
});

async function getCertificates(employeeId)
{
    const rows = await db.all('SELECT * FROM Certifications', async (err, rows) => {
        if (err) 
        {
            console.error(err.message);
            return JSON.stringify(`${err}: ${err.message}`);
        } 
        else 
        {
            console.log(rows);
            return rows;
        }
    });
}
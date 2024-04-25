const express = require("express")
const app = express()

app.get("/app/employee/certs", (req, res) =>
{
    const employeeId = req.headers.EmployeeId;
    res.send(employeeId);
})

app.post("/app/employee/addCert", (req, res) =>
{
    res.send('');
})

app.put("/app/employee/updateCert", (req, res) =>
{
    res.send('');
})

app.delete("/app/employee/deleteCert", (req, res) =>
{
    res.send('');
})

app.get("/app/employee/searchCert", (req, res) =>
{
    res.send('');
})

const port = 5000
app.listen(PORT, () => 
{
    console.log(`Server is running on port ${PORT}`);
});
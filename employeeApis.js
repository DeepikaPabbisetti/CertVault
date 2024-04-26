const express = require("express")
const cors = require('cors');

const app = express()
app.use(cors());

app.get("/api/:employeeId/certs", async (req, res) =>
{
    res.send('');
})

app.post("/api/:employeeId/certs", (req, res) =>
{
    res.send('');
})

app.put("/api/:employeeId/certs/:credentialId", (req, res) =>
{
    res.send('');
})

app.delete("/api/:employeeId/certs", (req, res) =>
{
    res.send('');
})

const PORT = 5000
app.listen(PORT, () => 
{
    console.log(`Server is running on port ${PORT}`);
});

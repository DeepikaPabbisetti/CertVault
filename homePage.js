// Home page to show all the certificates, add, update and delete certificate

let token = localStorage.getItem('Token');
let fields = ["CertName", "Issuer", "IssuedDate", "ExpiryDate", "CredentialId", "CredentialUrl"];
let labels = ["Issuer", "Issued", "Expires", "Credential ID", "View Certificate"];
let htmlElements = ["h2", "p", "p", "p", "p", "button"];

showCerts();

async function loadCerts()
{
    let options = {method: "GET", headers: {"Content-Type": "text/javascript", "Token": token}};
    const response = await fetch("http://localhost:5000/api/certs", options);
    let certs = await response.json();
    return certs;
}

async function showCerts()
{
    let response = await loadCerts();
    let certs = response.Certs;
    let block = document.getElementById("employeeCerts");
    for (let certCounter = 0; certCounter < certs.length; certCounter++)
    {
        let divBlock = document.createElement("div");
        let element = document.createElement(htmlElements[0]);
        element.innerText = certs[certCounter][fields[0]];
        divBlock.appendChild(element);
        for (let counter = 0; counter < labels.length - 1 ; counter++)
        {
            let row = `<span>${labels[counter]}: ${certs[certCounter][fields[counter + 1]]}</span><br>`;
            divBlock.innerHTML += row;
        }
        let row = `<a href="${certs[certCounter][fields[fields.length - 1]]}">${labels[labels.length - 1]}</a>`
        divBlock.innerHTML += row;
        block.appendChild(divBlock);
    }
}

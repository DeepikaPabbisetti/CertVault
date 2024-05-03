// Home page to show all the certificates, add, update and delete certificate

let token = localStorage.getItem('Token');
let fields = ["CertName", "Issuer", "IssuedDate", "ExpiryDate", "CredentialId", "CredentialUrl"];
let labels = ["Issuer", "Issued", "Expires", "Credential ID", "View Certificate"];
let htmlElements = ["h2", "p", "p", "p", "p", "button"];
let url = "http://localhost:5000/api/certs";

main();

let isEdit = null;
let credentialId;

async function main()
{
    createAddCertForm();
    await showCerts(); 
    bindEvents();
}

function bindEvents() 
{
    let addButton = document.getElementById("add");
    const formContainer = document.getElementById("addCertDiv");
    const submitButton = document.getElementById("submitButton");
    const closeButton = document.getElementById("closeButton");
    const deleteButtons = document.querySelectorAll("#Delete");
    const editButtons = document.querySelectorAll("#Edit");
    submitButton.addEventListener("click", function(event)
    {
        event.preventDefault();
        if (formContainer.style.display === "block") 
        {
            hideForm(formContainer);
        }
        if (isEdit == true)
        {
            updateCert();
        }
        else if(isEdit == false)
        {
            addCert();
        }
    });
    
    closeButton.addEventListener('click', function(event)
    {
        isEdit = null;
        event.preventDefault();
        if (formContainer.style.display === "block") 
        {
            hideForm(formContainer);
        }
    });

    addButton.addEventListener("click", function(event) 
    {
        isEdit = false;
        event.preventDefault();
        resetInputFields();
        if (formContainer.style.display === "none") 
        {
            showForm(formContainer);
        }
        submitButton.value = "Save";
        closeButton.value = "Close";
    });

    editButtons.forEach(function(button) 
    {
        isEdit = true;
        button.addEventListener("click", function(event) 
        {
            event.preventDefault();
            if (formContainer.style.display === "none") 
            {
                showForm(formContainer);
            }
            editCert(this);
            submitButton.value = "Edit";
            closeButton.value = "Close";
        });
    });

    deleteButtons.forEach(function(button) 
    {
        button.addEventListener("click", function(event) 
        {
            deleteCert(this);
        });
    });
}

function resetInputFields() 
{
    const inputFields = document.getElementById("addCertForm").querySelectorAll('input');
    inputFields.forEach(function(inputField) {
        inputField.value = '';
    });
}

function hideForm(formContainer)
{
    formContainer.style.display = "none";
}

function showForm(formContainer)
{
    formContainer.style.display = "block";
}

async function getCerts()
{
    let options = {method: "GET", headers: {"Content-Type": "application/json", "Token": token}};
    try
    {
        const response = await fetch("http://localhost:5000/api/certs", options);
        let certs = await response.json();
        return certs;
    }
    catch(error)
    {
        console.log(error);
        return error;
    }
}

function addButtons() 
{
    let buttons = ["Edit", "Delete"];
    let certBlocks = document.querySelectorAll("div.cert");

    certBlocks.forEach(function(certBlock) 
    {
        for (let counter = 0; counter < 2; counter++)
        {
            let button = document.createElement("button");
            button.id = buttons[counter];
            button.innerText = buttons[counter];
            certBlock.appendChild(button);
        }
    });
}

async function createAddCertForm()
{
    let inputTypes = ["text", "text", "date", "date", "text", "text"];
    let container = document.getElementById("container");
    let button = document.createElement("button");
    button.id="add";
    button.innerText = "Add";
    container.appendChild(button);

    let divBlock = document.createElement("div");
    divBlock.id = "addCertDiv";
    divBlock.style.display = "none";
    container.appendChild(divBlock);

    let addCertForm = document.createElement("form");
    addCertForm.id = "addCertForm";

    for (let counter = 0;  counter < fields.length; counter++)
    {
        let label = document.createElement("label");
        label.innerText = fields[counter];
        addCertForm.appendChild(label);

        let element = document.createElement("input");
        element.type = inputTypes[counter];
        element.required = true;
        element.id = fields[counter];
        element.placeholder = `Enter ${fields[counter]}`;
        addCertForm.appendChild(element);

        let lineBreak = document.createElement("br");
        addCertForm.appendChild(lineBreak);
    }

    let submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.id = "submitButton";
    submitButton.innerText = "Submit"

    let closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.id = "closeButton";
    closeButton.innerText = "close";
    
    addCertForm.appendChild(submitButton);
    addCertForm.appendChild(closeButton);
    divBlock.appendChild(addCertForm);
}

function getCert()
{
    let cert = {};
    for (let counter = 0; counter < fields.length; counter++)
    {
        cert[fields[counter]] = document.getElementById(fields[counter]).value;
    }
    return cert;
}

async function callApi(url, options)
{
    try
    {
        const response = await fetch(url, options);
        isEdit = null;
        await showCerts();
        await printResult(response);
    }
    catch(error)
    {
        console.log(error);
    }
}

async function printResult(response)
{
    let result = await response.json();
    if (response.status == 200)
    {
        console.log(`${result.Status}`);
    }
    else
    {
        console.log(result);
    }
}

async function addCert()
{
    const cert = getCert();
    const options = {method: "POST", headers: {"Content-Type": "application/json", "Token": token}, body: JSON.stringify(cert)};
    await callApi(url, options);
}

async function showCerts()
{
    let response = await getCerts();
    let certs = response.Certs;
    if (certs)
    {
        let block = document.getElementById("employeeCerts");
        block.innerHTML = "";
        for (let certCounter = 0; certCounter < certs.length; certCounter++)
        {
            let divBlock = document.createElement("div");
            divBlock.className = "cert";
            let element = document.createElement(htmlElements[0]);
            element.innerText = certs[certCounter][fields[0]];
            divBlock.appendChild(element);
            for (let counter = 0; counter < labels.length - 1 ; counter++)
            {
                let row = `<span>${labels[counter]}: ${certs[certCounter][fields[counter + 1]]}</span><br>`;
                divBlock.innerHTML += row;
            }
            let row = `<a href="${certs[certCounter][fields[fields.length - 1]]}">${labels[labels.length - 1]}</a><br>`
            divBlock.innerHTML += row;
            block.appendChild(divBlock);
        }
        addButtons();
        bindEvents();
    }
}

function populateInputBoxes(cert) 
{
    for (let counter = 0; counter < fields.length; counter++)
    {
        document.getElementById(fields[counter]).value = cert[fields[counter]];
    }
}

function getDivValues(object)
{
    let cert = {};
    const divBlock = object.parentNode;
    cert[fields[0]] = divBlock.firstChild.innerText;

    const certBlock = [];
    for (let counter = 1; counter < divBlock.children.length; counter++) 
    {
        const childElement = divBlock.children[counter];
        certBlock.push(childElement.textContent.trim());
    }

    let issued, issuer, expires, credentialId, viewCertificateHref;

    for (let counter = 0; counter < certBlock.length; counter++) 
    {
        let value = certBlock[counter].trim();

        if (value.includes("Issued:")) 
        {
            issued = value.replace("Issued:", "").trim();
        }

        if (value.includes("Issuer:")) 
        {
            issuer = value.replace("Issuer:", "").trim();
        }

        else if (value.includes("Expires:")) 
        {
            expires = value.replace("Expires:", "").trim();
        }
        
        else if (value.includes("Credential ID:")) 
        {
            credentialId = value.replace("Credential ID:", "").trim();
        }
        
        else if (value.includes("View Certificate")) 
        {
            viewCertificateHref = divBlock.children[counter + 1].href;
        }
    }
    cert["IssuedDate"] = issued;
    cert["Issuer"] = issuer;
    cert["ExpiryDate"] = expires;
    cert["CredentialId"] = credentialId;
    cert["CredentialUrl"] = viewCertificateHref;
    return cert;
}

async function editCert(object)
{
    const cert = getDivValues(object);
    credentialId = cert.CredentialId;
    populateInputBoxes(cert);
    isEdit = true;
}

async function updateCert()
{
    let updatedCert = getCert();
    let options = {method: "PUT", headers: {"Content-Type": "application/json", "Token": token}, body: JSON.stringify(updatedCert)};
    if (credentialId)
    {
        await callApi(`${url}/${credentialId}`, options);
    }
}

async function deleteCert(object)
{
    const cert = getDivValues(object);
    credentialId = cert.CredentialId;
    let options = {method: "DELETE", headers: {"Content-Type": "application/json", "Token": token}};
    if (credentialId)
    {
        if (confirm(`Are you sure want to delete ${credentialId}?`))
	    {
            await callApi(`${url}/${credentialId}`, options);
        }
        else
        {
            alert("You cancelled!")
        }
    }
}
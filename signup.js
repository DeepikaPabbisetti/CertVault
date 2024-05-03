// Login user and store token in local storage

let fields = ["employeeId", "userName", "password", "email", "submit"];
let inputTypes = ["text", "text", "password", "email", "submit"];
let labels = ["Employee Id", "User name", "Password", "Email"];
let form;

createForm();
bindEvent();

function createForm()
{
    form = document.createElement("form");
    form.id = "signupForm";
    document.getElementById("signupPage").appendChild(form);

    for (let counter = 0; counter < fields.length; counter++)
    {
        if (counter < fields.length - 1)
        {
            let label = document.createElement("label");
            label.innerText = labels[counter];
            let lineBreak = document.createElement("br");
            form.appendChild(label);
            form.appendChild(lineBreak);
        }
        let formElement = document.createElement("input");
        formElement.type = inputTypes[counter];
        formElement.id = fields[counter];
        formElement.required = true;
        form.appendChild(formElement);
        form.appendChild(document.createElement("br"));
    }
}

function bindEvent()
{
    form.addEventListener("submit", function(event)
    {
        event.preventDefault();
        signup()
    });
}

async function signup() 
{
    let employeeId = document.getElementById(fields[0]).value;
    let userName = document.getElementById(fields[1]).value;
    let password = document.getElementById(fields[2]).value;
    let email = document.getElementById(fields[3]).value;
    let data = { EmployeeId: employeeId, UserName: userName, Password: password, Email: email };
    const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)};
    try 
    {
        const response = await fetch("http://localhost:5000/api/signup", options);
        let result = await response.json();
        if (result.Status == 1)
        {
            alert("User created successfully");
            window.location.assign("./index.html");
        }
        else
        {
            console.log(result.code);
            alert("Failed to create new user");
        }
    } 
    catch (error) 
    {
        console.log('Unable to fetch:', error);
    }
}

## List Certs:

```code
    Method: GET
    Endpoint: /api/employee/certs
    Query params: ?sort=desc
    Payload: 
        {
            "EmployeeId": "EmployeeId"
        }
    Response JSON:
        [{
            "CertId": "CertId",
            "CertName": "CertName",
            "Issuer": "IssuingOrganization",
            "IssuedDate": "IssuedDate",
            "ExpiredDate": "ExpirationDate",
            "CredentialId": "CredentialId",
            "CredentialUrl": "CredentialUrl"
        }, {....}, ]
    Response Code: 200(OK), 404(Employee Not Found)
```

Add cert
    Method: POST
    Endpoint: /api/employee/addCert
    Query params: None
    Payload:
        {
            "EmployeeId": "EmployeeId",
            "CertId": "CertId",
            "CertName": "CertName",
            "Issuer": "IssuingOrganization",
            "IssuedDate": "IssuedDate",
            "ExpiredDate": "ExpirationDate",
            "CredentialId": "CredentialId",
            "CredentialUrl": "CredentialUrl"
        }
    Response JSON:
        {
            "CertId": "CertId",
            "Status": "InsertStatus"
        }
    Response Code: 200(OK), 404(Employee Not Found)

Update cert
    Method: PUT
    Endpoint: /api/employee/updateCert
    Query params: ?updateField=Issuer
    Payload:
        {
            "EmployeeId": "EmployeeId",
            "Issuer": "NewIssuer"
        }
    Response JSON:
        {
            "EmployeeId": "EmployeeId",
            "Status": "UpdateStatus"
        }
    Response Code: 200(OK), 404(Employee Not Found)

Delete cert
    Method: DELETE
    Endpoint: /api/employee/deleteCert
    Query params: None
    Payload:
        {
            "EmployeeId": "EmployeeId"
        }
    Response JSON:
        {
            "EmployeeId": "EmployeeId",
            "Status": "DeleteStatus"
        }
    Response Code: 200(OK), 404(Employee Not Found)

## List Certs:

```code
    Method: GET
    Endpoint: /api/employee/certs
    Query params: ?sort=(desc/asc)&sortBy=(CertName/IssuedDate/ExpiredDate)
    Payload:
        Request payload: 
            {
                EmployeeId: "EmployeeId"
            }
    Response JSON:
        [{
            CertName: "CertName",
            Issuer: "IssuingOrganization",
            IssuedDate: "IssuedDate",
            ExpiredDate: "ExpirationDate",
            CredentialId: "CredentialId",
            CredentialUrl: "CredentialUrl"
        }, {....}, ]
    Response Code: 200(OK), 404(Employee Not Found)
```

## Add cert:

```code
    Method: POST
    Endpoint: /api/employee/addCert
    Query params: None
    Payload:
        Response payload:
            {
                EmployeeId: "EmployeeId",
                CertName: "CertName",
                Issuer: "IssuingOrganization",
                IssuedDate": "IssuedDate",
                ExpiredDate": "ExpirationDate",
                CredentialId: "CredentialId",
                CredentialUrl: "CredentialUrl"
            }
    Response JSON:
        {
            Status: "InsertStatus"
        }
    Response Code: 200(OK), 404(Employee Not Found)
```

## Update cert:

```code
    Method: PUT
    Endpoint: /api/employee/updateCert
    Query params: ?updateField=FieldName
    Payload:
        Request payload:
            {
                EmployeeId: "EmployeeId",
                CredentialId: "CredentialId",
                FieldName: "NewValue"
            }
    Response JSON:
        {
            Status: "UpdateStatus"
        }
    Response Code: 200(OK), 404(Employee Not Found)
```

## Delete cert

```code
    Method: DELETE
    Endpoint: /api/employee/deleteCert
    Query params: None
    Payload:
        Request payload:
            {
                EmployeeId: "EmployeeId",
                CredentialId: "CredentialId"
            }
    Response JSON:
        {
            Status: "DeleteStatus"
        }
    Response Code: 200(OK), 404(Employee Not Found)
```

## Search cert
```code
    Method: GET
    Endpoint: /api/employee/searchCert
    Query params: None
    Payload:
        Request payload
            {
                EmployeeId: "EmployeeId",
                CredentialId: "CredentialId"
            }
    Response JSON:
       {
            CertName: "CertName",
            Issuer: "IssuingOrganization",
            IssuedDate: "IssuedDate",
            ExpiredDate: "ExpirationDate",
            CredentialId: "CredentialId",
            CredentialUrl: "CredentialUrl"
        }
    Response Code: 200(OK), 404(Employee Not Found)
```
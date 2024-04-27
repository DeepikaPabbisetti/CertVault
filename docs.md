## List Certs:

```code
    Method: GET
    Endpoint: /api/:employeeId/certs
    Query params: ?sort=(desc/asc)&sortBy=(CertName/IssuedDate/ExpiryDate)
    Payload: None
    Response JSON:
    Success:
        {
            "Certs":
            [{
                "CertName": "CertName",
                "Issuer": "IssuingOrganization",
                "IssuedDate": "IssuedDate",
                "ExpiryDate": "ExpirationDate",
                "CredentialId": "CredentialId",
                "CredentialUrl": "CredentialUrl"
            }, {....}, ]
        }
    Failure:
        {
            "Error":
            {
                "Code": "errorCode",
                "Message": "errorMessage",
            }
        }
    Response Code: 200(OK)/204(No Content)/500(Internal Server Error)
```

## Add cert:

```code
    Method: POST
    Endpoint: /api/:employeeId/certs
    Query params: None
    Payload:
        Request payload:
            {
                "CertName": "CertName",
                "Issuer": "IssuingOrganization",
                "IssuedDate": "IssuedDate",
                "ExpiryDate": "ExpirationDate",
                "CredentialId": "CredentialId",
                "CredentialUrl": "CredentialUrl"
            }
            Response payload: None
    Response JSON:
    Success:
        {
            "InsertedCert":
            {
                "CertName": "CertName",
                "Issuer": "IssuingOrganization",
                "IssuedDate": "IssuedDate",
                "ExpiryDate": "ExpirationDate",
                "CredentialId": "CredentialId",
                "CredentialUrl": "CredentialUrl"
            },
            "Status": "Certificate added successfully"
        }
    Failure:
        {
            "Error":
            {
                "Code": "ErrorCode",
                "Message": "ErrorMessage",
            }
        }
    Response Code: 201(Created)/500(Internal Server Error)
```

## Update cert:

```code
    Method: PUT
    Endpoint: /api/:employeeId/certs/:credentialId
    Query params: None
    Payload:
        Request payload:
        {
            "CertName": "CertName",
            "Issuer": "IssuingOrganization",
            "IssuedDate": "IssuedDate",
            "ExpiryDate": "ExpirationDate",
            "CredentialId": "CredentialId",
            "CredentialUrl": "CredentialUrl"
        }
        Response payload: None
    Response JSON:
    Success:
        {
            "UpdatedCert":
            {
                "CertName": "CertName",
                "Issuer": "IssuingOrganization",
                "IssuedDate": "IssuedDate",
                "ExpiryDate": "ExpirationDate",
                "CredentialId": "CredentialId",
                "CredentialUrl": "CredentialUrl"
            },
            "Status": "Certificate updated successfully"
        }
    Failure:
        {
            "Error":
            {
                "Code": "ErrorCode",
                "Message": "ErrorMessage",
            }
        }
    Response Code: 200(OK)/404(Employee Not Found)/500(Internal Server Error)
```

## Delete cert

```code
    Method: DELETE
    Endpoint: /api/:employeeId/certs/:credentialId
    Query params: None
    Payload: None
    Response JSON:
    Success:
        {
            "CredentialId": "credentialId",
            "Status": "message"
        }
    Failure:
        "Error":
        {
            "Code": "ErrorCode",
            "Message": "ErrorMessage",
        }
    Response Code: 200(OK)/404(Not Found)/500(Internal Server Error)
```

## Search cert
```code
    Method: GET
    Endpoint: /api/:employee/certs/searchCert/:credentialId
    Query params: None
    Payload: None
    Response JSON:
       {
            "certName": "CertName",
            "issuer": "IssuingOrganization",
            "issuedDate": "IssuedDate",
            "expiryDate": "ExpirationDate",
            "credentialId": "CredentialId",
            "credentialUrl": "CredentialUrl"
        }
    Response Code: 200(OK)/404(Not Found)/500(Internal Server Error)
```
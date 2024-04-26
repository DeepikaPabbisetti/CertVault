## List Certs:

```code
    Method: GET
    Endpoint: /api/:employeeId/certs
    Query params: ?sort=(desc/asc)&sortBy=(CertName/IssuedDate/ExpiryDate)
    Payload: None
    Response JSON:
        [{
            "certName": "CertName",
            "issuer": "IssuingOrganization",
            "issuedDate": "IssuedDate",
            "expiryDate": "ExpirationDate",
            "credentialId": "CredentialId",
            "credentialUrl": "CredentialUrl"
        }, {....}, ]
    Response Code: 200(OK)/404(Not Found)
```

## Add cert:

```code
    Method: POST
    Endpoint: /api/:employeeId/certs
    Query params: None
    Payload:
        Request payload:
            {
                "certName": "CertName",
                "issuer": "IssuingOrganization",
                "issuedDate": "IssuedDate",
                "expiryDate": "ExpirationDate",
                "credentialId": "CredentialId",
                "credentialUrl": "CredentialUrl"
            }
            Response payload: None
    Response JSON:
    Success:
        {
            "certName": "CertName",
            "issuer": "IssuingOrganization",
            "issuedDate": "IssuedDate",
            "expiryDate": "ExpirationDate",
            "credentialId": "CredentialId",
            "credentialUrl": "CredentialUrl"
        }
    Failure:
        {
            "error":
            {
                "code": "errorCode",
                "message": "errorMessage",
                "description": "errorDescription"
            }
        }
    Response Code: 201(Created)/404(Employee Not Found)
```

## Update cert:

```code
    Method: PUT
    Endpoint: /api/:employeeId/certs/:credentialId
    Query params: None
    Payload:
        Request payload:
        {
            "updateDetails":
            {
                "expiryDate": "expirationDate"
            }
        }
        Response payload: None
    Response JSON:
    Success:
        {
            "updatedCert":
            {
                "certName": "CertName",
                "issuer": "IssuingOrganization",
                "issuedDate": "IssuedDate",
                "expiryDate": "ExpirationDate",
                "credentialId": "CredentialId",
                "credentialUrl": "CredentialUrl"
            }
        }
    Failure:
        {
            "error":
            {
                "code": "errorCode",
                "message": "errorMessage",
                "description": "errorDescription"
            }
        }
    Response Code: 200(OK)/404(Employee Not Found)
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
            "credentialId": "credentialId",
            "message": "message"
        }
    Failure:
        "error":
        {
            "code": "errorCode",
            "message": "errorMessage",
            "description": "description"
        }
    Response Code: 200(OK)/404(Employee Not Found)
```

## Search cert
```code
    Method: GET
    Endpoint: /api/:employee/searchCert/:credentialId
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
    Response Code: 200(OK)/404(Employee Not Found)
```
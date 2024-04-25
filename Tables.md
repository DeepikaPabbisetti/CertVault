Tables
    1. Users
    2. Employee
    3. Employer
    4. Certifications
    5. EmployeeCertificates

Users:
    UserName (Primary key)
    PassWord
    UserType

Employee:
    EmployeeId (Primary key)
    UserName (Foreign key)
    Name
    Designation

Employeer:
    EmployeerId (Primary key)
    UserName (Foreign key)
    CompanyName
    Designation

Certifications:
    CredentialId (Primary key)
    CertName
    Issuer
    IssuedDate
    ExpiryDate
    CredentialUrl

EmployeeCerts:
    EmployeeId (Foreign key)
    CredentialId (Foreign key)
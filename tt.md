# API Documentation

## Show User Info

This endpoint retrieves the profile information of a specific user.

- **URL**: `/certpro/api/:user/profile`
- **Method**: GET
- **Authentication**: Required
- **Permissions**: Current user (Employee)
- **Success Response**:
  - **Code**: 200 OK
  - **Content Example**:
    ```json
    {

      "emp_id": "xxx",
      "name": "xxxxx",
      "email": "xxxxx@gmail.com",
      "photo": "emp_id_profile.jpg",
      "dob": "dd/mm/yyyy"
    } ```
- **Error Responses**:
  - **Code**: 400 Bad Request, 401 Unauthorized, etc.

## Update User Info

This endpoint updates the profile information of a specific user.

- **URL**: `/certpro/api/:user/profile/`
- **Method**: PUT
- **Authentication**: Required
- **Permissions**: Current user (Employee)
- **Data Request Payload**:
  ```json
  {
  "name": "xxxxx",
  "photo": "emp_id_profile.jpg",
  "dob": "dd/mm/yyyy",
  }
  ```
## Success Response

- **Code**: 201 OK
- **Content Example**:
  ```json
  {
  "emp_id": "xxx",
  "name": "xxxxx",
  "email": "xxxxx@gmail.com",
  "photo": "emp_id_profile.jpg",
  "dob": "dd/mm/yyyy"
  }
  ```

## Error Responses

- **Code**: 202
  - **Example response**:
    ```json
    {
      "error_message": "Requested operation has not been processed."
    }
    ```
- **Code**: 403 FORBIDDEN
  - **Response**:
    ```json
    {
      "error_message": "User is not authorized."
    }
    ```

## Delete User Account

This endpoint allows for the removal of a user account from the system, including all associated profile information.

- **URL**: /certpro/api/:user/profile/
- **Method**: DELETE
- **Authentication**: Required
- **Authentication Header**: auth_key (String) - Generated during user login
- **Permissions**: Employee (Current User)
- **Path Parameters**:
  - 'user' (String): The username of the profile to be deleted.

### Success Response:

- **Code**: 204 NO CONTENT
  - This status code indicates that the request has been successfully processed, and there is no content to return.

### Error Responses:

- **Code**: 403 FORBIDDEN
  - **Example Response**:
    ```json
    {
      "error_message": "Access forbidden. You are not authorized to perform this action."
    }
    ```
- **Code**: 404 NOT FOUND
  - **Example Response**:
    ```json
    {
      "error_message": "User not found."
    }
    ```

## Add Certification

This endpoint enables the user to add certification to the user's profile.

- **URL**: /certpro/api/:user/certifications/
- **Method**: POST
- **Authentication**: Required
- **Authentication Header**: auth_key (String) - Generated during user login
- **Permissions**: Employee (Current User)
- **Path Parameters**:
  - 'user' (String): The username of the user to whom the certification will be added.

### Request Body:

```json
{
  "name": "Certification Name",
  "issuing_organization": "Organization Name",
  "date_received": "yyyy-mm-dd",
  "expiration_date": "yyyy-mm-dd",
  "credential_id": "Credential ID",
  "credential_url": "Credential URL"
}
```

## Success Response:

- **Code**: 201 CREATED
  - This status code indicates that the request has been successfully fulfilled, and a new resource has been returned as a result.
- **Content Example**:

```json
{
  "certification_id": "unique_id",
  "name": "Certification Name",
  "issuing_organization": "Organization Name",
  "date_received": "yyyy-mm-dd",
  "expiration_date": "yyyy-mm-dd",
  "credential_id": "Credential ID",
  "credential_url": "Credential URL"
}
```

## Error Responses:

- **Code**: 400 BAD REQUEST
  - **Example Response**:
    ```json
    {
      "error_message": "Invalid input data. Please check your request body."
    }
    ```
- **Code**: 403 FORBIDDEN
  - **Example Response**:
    ```json
    {
      "error_message": "Access forbidden. You are not authorized to perform this action."
    }
    ```
- **Code**: 404 NOT FOUND
  - **Example Response**:
    ```json
    {
      "error_message": "User not found."
    }
    ```

## Update Certification

This endpoint enables the user to update certification to user's profile.

- **URL**: /certpro/api/:user/certifications?
- **Method**: PUT
- **Authentication**: Required
- **Authentication Header**: auth_key (String) - Generated during user login
- **Permissions**: Employee (Current User)
- **Path Parameters**:
  - `user` (String): The username of the user to whom the certification will be updated.
- **Query Parameters**:
  - `credential_id` (String): Credential Id of the certificate to be updated

### Request Body:

```json
{
  "name": "Certification Name",
  "issuing_organization": "Organization Name",
  "date_received": "yyyy-mm-dd",
  "expiration_date": "yyyy-mm-dd",
  "credential_id": "Credential ID",
  "credential_url": "Credential URL"
}
```

## Success Response:

- **Code**: 201 CREATED
  - This status code indicates that the request has been successfully fulfilled, and a new resource has been created as a result.
- **Content Example**:

```json
{
  "certification_id": "unique_id",
  "name": "Certification Name",
  "issuing_organization": "Organization Name",
  "date_received": "yyyy-mm-dd",
  "expiration_date": "yyyy-mm-dd",
  "credential_id": "Credential ID",
  "credential_url": "Credential URL"
}
```

## Error Responses:

- **Code**: 400 BAD REQUEST

  - **Example Response**:
    ```json
    {
      "error_message": "Invalid input data. Please check your request body."
    }
    ```

- **Code**: 403 FORBIDDEN

  - **Example Response**:
    ```json
    {
      "error_message": "Access forbidden. You are not authorized to perform this action."
    }
    ```

- **Code**: 404 NOT FOUND
  - **Example Response**:
    ```json
    {
      "error_message": "User not found."
    }
    ```

## Search Certification

This endpoint enables the user to search certification.

- **URL**: `/certpro/api/:user/certifications?`
- **Method**: GET
- **Authentication**: Required
- **Authentication Header**: `auth_key` (String) - Generated during user login
- **Permissions**: Employee (Current User)

### Path Parameters:

- `user` (String): The username of the user to whom the certification will be searched

### Query Parameters:

- `cert_name` (String): The name of the certification to retrieve.
- `filter_option` (String, optional): Additional filter options for the search.

**Example URL**:  
`/certpro/api/johndoe/certifications?cert_name=AWS Cloud &filter_option=expired`

### Success Response:

- **Code**: 200 OK
  - This status code indicates that the request was successful, and the server is returning the requested resource in the response body.
  - **Content Example**:
    ```json
    [
      {
        "certification_id": "unique_id_1",
        "name": "AWS Cloud Foundation",
        "issuing_organization": "AWS",
        "date_received": "yyyy-mm-dd",
        "expiration_date": "yyyy-mm-dd",
        "credential_id": "Credential ID 1",
        "credential_url": "Credential URL 1"
      },
      {
        "certification_id": "unique_id_2",
        "name": "AWS Cloud Architecture",
        "issuing_organization": "AWS",
        "date_received": "yyyy-mm-dd",
        "expiration_date": "yyyy-mm-dd",
        "credential_id": "Credential ID 2",
        "credential_url": "Credential URL 2"
      },
      {
        "certification_id": "unique_id_3",
        "name": "Azure Fundamentals",
        "issuing_organization": "Microsoft",
        "date_received": "yyyy-mm-dd",
        "expiration_date": "yyyy-mm-dd",
        "credential_id": "Credential ID 3",
        "credential_url": "Credential URL 3"
      }
    ]
    ```

### Error Responses:

- **Code**: 403 FORBIDDEN

  - **Example Response**:
    ```json
    {
      "error_message": "Access forbidden. You are not authorized to perform this action."
    }
    ```

- **Code**: 404 NOT FOUND
  - **Example Response**:
    ```json
    {
      "error_message": "Cert not found."
    }
    ```

## Show Certifications

This endpoint enables retrieval of certification from the user's profile.

- **URL**: `/certpro/api/:user/certifications?filteroption=xxxx`
- **Method**: GET
- **Authentication**: Required
- **Authentication Header**: `auth_key` (String) - Generated during user login
- **Permissions**: Employee (Current User)

### Path Parameters:

- `user` (String): The username of the user to whom the certification will be searched

### Query Parameters:

- `filter_option` (String, optional): Additional filter options for the listout.

### Success Response:

- **Code**: 200 OK
  - This status code indicates that the request was successful, and the server is returning the requested resource in the response body.
  - **Content Example**:
    ```json
    [
      {
        "certification_id": "unique_id_1",
        "name": "AWS Cloud Foundation",
        "issuing_organization": "AWS",
        "date_received": "yyyy-mm-dd",
        "expiration_date": "yyyy-mm-dd",
        "credential_id": "Credential ID 1",
        "credential_url": "Credential URL 1"
      },
      {
        "certification_id": "unique_id_2",
        "name": "AWS Cloud Architecture",
        "issuing_organization": "AWS",
        "date_received": "yyyy-mm-dd",
        "expiration_date": "yyyy-mm-dd",
        "credential_id": "Credential ID 2",
        "credential_url": "Credential URL 2"
      },
      {
        "certification_id": "unique_id_6",
        "name": "Azure Fundamentals",
        "issuing_organization": "Microsoft",
        "date_received": "yyyy-mm-dd",
        "expiration_date": "yyyy-mm-dd",
        "credential_id": "Credential ID 3",
        "credential_url": "Credential URL 3"
      }
    ]
    ```

### Error Responses:

- **Code**: 403 FORBIDDEN

  - **Example Response**:
    ```json
    {
      "error_message": "Access forbidden. You are not authorized to perform this action."
    }
    ```

- **Code**: 404 NOT FOUND
  - **Example Response**:
    ```json
    {
      "error_message": "User not found."
    }
    ```

```

```

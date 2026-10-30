# Campus Bazaar — Resource API Contract

**Status:** Provisional — Pending review by Frontend and Database Members  
**Owner:** Member 2 — Backend Developer

## 1. Endpoint

`GET /api/resources`

**Purpose:** Retrieve academic resources available on Campus Bazaar.

## 2. Successful Response

HTTP Status: `200 OK`

```json
{
  "success": true,
  "message": "Resources retrieved successfully.",
  "data": [
    {
      "resourceId": 1,
      "title": "Introduction to Database Systems",
      "course": "Database Systems",
      "fileType": "PDF",
      "uploadDate": "2026-10-30T10:00:00"
    }
  ]
}
```

## 3. Response Fields

| Field | Type | Description |
|---|---|---|
| resourceId | Integer | Resource identifier |
| title | String | Resource title |
| course | String | Associated course |
| fileType | String | Resource file format |
| uploadDate | DateTime | Resource upload date |

## 4. Error Response Format

```json
{
  "success": false,
  "message": "An error occurred.",
  "data": null,
  "errors": []
}
```

## 5. Planned HTTP Status Codes

| Status | Meaning |
|---|---|
| 200 | Request successful |
| 400 | Invalid request |
| 401 | Authentication required |
| 403 | Access forbidden |
| 404 | Resource not found |
| 500 | Internal server error |
| 503 | Service unavailable |

## 6. Integration Notes

- JSON property naming uses camelCase.
- The contract is provisional until reviewed with Members 1 and 3.
- Actual database-backed resource retrieval will be implemented after the database schema and mapping are provided by Member 3.
- No database schema or table definitions are owned by Member 2.
- Internal exception details and database credentials must never be exposed through API responses.

## 7. Current Implementation Status

- Resource endpoint: Implemented.
- Response DTO: Implemented.
- Database connectivity: Tested.
- Actual resource retrieval: Pending database integration.
- Authentication and authorization: Future implementation.

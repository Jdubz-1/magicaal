# API Reference

Base URL: `http://localhost:3000` (development)

## Endpoints

### Health Check

```
GET /health
```

Returns service health status. This endpoint is always unprotected.

**Response `200 OK`**
```json
{
  "status": "OK",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

---

> **Template note**: Document additional endpoints here as you add them. Use the format above:
> - Method and path as a header
> - Description
> - Request parameters/body (if any)
> - Response examples for success and error cases

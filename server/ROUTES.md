# JSON-Server routes

This documents lists the available routes served by this json-server mock API.

## List of routes

All the routes listed below are **read-only mode**.
You can only access the resources through the `GET` HTTP method.

### Products

List of all available products. `id` parameter is optional, if  not specified, all the products will be retrieved.

#### Route

```http request
GET /api/products/:id?
```

#### Response

```json
{
    "id": "<number>",
    "category": "<string>",
    "name": "<string>",
    "sale_price": "<number>",
    "margin": "<number>"
}
```

### Costumers

List of all company customers. `id` parameter is optional, if  not specified, all the products will be retrieved.

#### Route

```http request
GET /api/customers/:id?
```

#### Response

```json
{
    "id": "<number>",
    "firstName": "<string>",
    "lastName": "<string>"
}
```

### Invoices

List of all company invoices + content (invoices lines).

#### Route

```http request
GET /api/invoices/:id?
```

#### Response

```json
{
  "id": "<number>",
  "customer_id": "<number>",
  "customer_name": "<string>",
  "date": "<YYYY-MM-DD>",
  "total_invoice": "<number>",
  "total_margin": "<number>",
  "region":  "<string>",
  "invoice_lines": [
    {
      "product_id": "<number>",
      "product_name": "<string>",
      "unit_price": "<number>",
      "quantity": "<number>",
      "total_line": "<number>",
      "total_margin": "<number>"
    }
  ]
}
```

### Revenues

Calculations of the revenues of the company on a time period.

#### Routes

`:period` argument is mandatory : can be either `monthly` or `weekly`

```http request
GET /api/revenues/:period
```

#### Response

**NB : `week` attribute is only available for weekly revenues, and respectively, `month` attribute only available for monthly results.**

```json
{
    "week": "<YYYY W-ww>",
    "month": "<YYYY-MM>",
    "start_date": "<YYYY-MM-DD>",
    "end_date": "<YYYY-MM-DD>",
    "invoices_count": "<number>",
    "total_margin": "<number>",
    "total_revenue": "<number>"
}
```

### Best customers

Retrieve the customers list, with the total revenue, margin and invoices count they generated.

```http request
GET /api/customers/revenues
```

#### Response

```json
{
    "customer_id": "<number>",
    "customer_name": "<string>",
    "total_revenue":"<number>",
    "total_margin": "<number>",
    "invoices_count": "<number>"
}
```

### Best products categories

Retrieve the products categories, and the  total amount of revenues and margin they generated.

#### Route

```http request
GET /api/categories/revenues
```

#### Response

```json
{
    "category_name": "<string>",
    "total_revenue": "<number>",
    "total_margin": "<number>"
}
```



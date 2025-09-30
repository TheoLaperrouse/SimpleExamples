# Open API Validation

## Quick Start

Install dependencies
```
yarn
```

Launch project
```
yarn start
```

Use curl to test the validations error 
```
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Théo"}'
```

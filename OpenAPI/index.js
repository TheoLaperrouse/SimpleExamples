import express from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import fs from "fs";
import YAML from "yaml";

const app = express();
const port = 3000;

app.use(express.json());

const file = fs.readFileSync("./openapi.yml", "utf8");
const openapiDoc = YAML.parse(file);

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const userSchema = openapiDoc.components.schemas.User;
const validateUser = ajv.compile(userSchema);

function validate(schemaValidator) {
  return (req, res, next) => {
    const valid = schemaValidator(req.body);
    if (!valid) {
      return res.status(400).json({
        message: "Invalid request",
        errors: schemaValidator.errors
      });
    }
    next();
  };
}

app.post("/users", validate(validateUser), (req, res) => {
  const { name, age } = req.body;
  res.json({ id: "123", name, age });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

import { graphql, buildSchema } from "graphql";
import cors from "../../../util/cors";

const types = require("../../../data/types.json");
const conditions = require("../../../data/conditions.json");

const schema = buildSchema(`
  type Type {
    name: String!
    icon: String!
  }
  type Condition {
    name: String!
    description: String!
    icon: String!
  }
  type Query {
    types: [Type!]!
    conditions: [Condition!]!
  }
`);

const root = {
  types: () => types,
  conditions: () => conditions
};

export default cors(async (req, res) => {
  const query = req.body.query;
  const response = await graphql(schema, query, root);

  return res.end(JSON.stringify(response));
});

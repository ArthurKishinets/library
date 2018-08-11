import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import mysql from 'mysql';
import query from './db/dbManager';

const app = express();

const schema = buildSchema(`
  type Query {
    select_all_actors(start: Int, count: Int): [Customer!]!
  },
  type Customer {
    cust_id: Int!,
    fed_id: String!,
    cust_type_cd: String!,
    adress: String,
    city: String!,
    state: String!,
    postal_code: String!
  }
`);

const rootValue = {
    select_all_actors: ({ start = 0, count = 10 }) => {
        const queryString = `SELECT * FROM customer LIMIT ${mysql.escape(start)}, ${mysql.escape(count)}`;
        return query(queryString);
    }
};

app.use(
    '/graphiql',
    graphqlHTTP({
        schema,
        rootValue,
        graphiql: true
    })
);

export default app;

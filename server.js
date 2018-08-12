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
    cust_id: Int,
    fed_id: String,
    cust_type_cd: String,
    address: String,
    city: String,
    state: String,
    postal_code: String
  }
  input CustomerInput {
    fed_id: String!,
    cust_type_cd: String!,
    address: String,
    city: String!,
    state: String!,
    postal_code: String!
  }
  type Mutation {
      createCustomer(customer: CustomerInput): Customer
  }
`);

const rootValue = {
    select_all_actors: ({ start = 0, count = 10 }) => {
        const queryString = `SELECT * FROM customer LIMIT ${mysql.escape(start)}, ${mysql.escape(count)}`;
        return query(queryString);
    },
    async createCustomer({
        customer: {
            fed_id, cust_type_cd, address, city, state, postal_code
        }
    }) {
        const queryString = `INSERT INTO customer (fed_id, cust_type_cd, address, city, state, postal_code)
            VALUES (${mysql.escape(fed_id)}, ${mysql.escape(cust_type_cd)}, ${mysql.escape(address)}, ${mysql.escape(city)}, ${mysql.escape(state)}, ${mysql.escape(postal_code)})`;
        await query(queryString);
        const resp = await query('SELECT * FROM customer WHERE cust_id= LAST_INSERT_ID()');
        return resp[0];
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

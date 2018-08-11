import { makeExecutableSchema } from 'graphql-tools';
import query from './db/dbManager';

const RootQuery = `
    type RootQuery {
        hello_world: String!,
        select_all_actors: [User!]!
    },
    type User {
        actor_id: Int!,
        first_name: String!
        last_name: String!
        last_update: String!
    }
`;

const SchemaDefinition = `
    schema {
        query: RootQuery
    }
`;

export default makeExecutableSchema({
    typeDefs: [SchemaDefinition, RootQuery],
    resolvers: {
        RootQuery: {
            hello_world: () => 'Hi from GraphQL!',
            select_all_actors: () => query('SELECT * FROM sakila.actor')
        }
    }
});

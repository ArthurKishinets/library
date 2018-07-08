import mysql from 'mysql';
import settings from './dbSettings';
import query from './query';
import * as queries from './queries';

const connection = mysql.createConnection(settings);

connection.connect();

const queryName = process.argv[2].split('=')[1];
if (!queryName) {
    console.log('You should provide query to evaluate.');
    process.exit(1);
} else if (!queries[queryName]) {
    console.log('There is no such query.');
    process.exit(1);
}

async function evalQuery() {
    try {
        const result = await query(connection, queries[queryName]);
        console.log('The solution is: ', result);
    } catch (e) {
        console.error(e);
    }
}

evalQuery();

connection.end();

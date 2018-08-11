import mysql from 'mysql';
import settings from './dbSettings';
import execQuery from '../server/query';

const connection = mysql.createConnection(settings);

connection.connect();

export default async function evalQuery(query) {
    try {
        const result = await execQuery(connection, query);
        return result;
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

/* connection.end(); */

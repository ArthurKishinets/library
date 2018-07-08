export default (connection, query) => new Promise((res, rej) => {
    connection.query(query, (error, results) => {
        if (error) return rej(error);
        res(results);
    });
});

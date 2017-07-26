let db = {
  executeTransaction(query) {
    let db = openDatabase("images", "0.1", "A list of to do items.", 2 * 1024 * 1024);
    return new Promise(function (resolve, reject) {
      db.transaction(function (transaction) {
        transaction.executeSql(query, [], function (transaction, result) {
          resolve([...result.rows]);
        });
      });
    });
  }
}
export default db;
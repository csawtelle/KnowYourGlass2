var pg = require('pg');
var connectionString = 'pg://kyg:KYG99@localhost:5432/kyg';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE post(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', function() { client.end(); });

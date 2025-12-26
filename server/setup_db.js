const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres', // Connect to default DB
    password: 'password',
    port: 5432,
});

async function createDatabase() {
    try {
        await client.connect();
        // Check if database exists
        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'testcasemgm'");
        if (res.rowCount === 0) {
            await client.query('CREATE DATABASE testcasemgm');
            console.log('Database testcasemgm created successfully.');
        } else {
            console.log('Database testcasemgm already exists.');
        }
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await client.end();
    }
}

createDatabase();

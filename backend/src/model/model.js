import { pool } from './pool.js';

class Model {
    constructor(table) {
        this.pool = pool;
        this.table = table;
        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', client, err);
            process.exit(-1);
        });
    }

    async select(columns, clause) {
        let query = `SELECT ${columns} FROM ${this.table}`;
        if (clause) query += clause;
        return this.pool.query(query);
    }

    async insertWithReturn(columns, values) {
        const query = `
            INSERT INTO ${this.table} (${columns})
            VALUES (${values})
            RETURNING *
        `;
        return this.pool.query(query);
    }
}

export default Model;
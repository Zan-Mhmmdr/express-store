import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'express_store',



})
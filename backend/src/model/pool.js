import pkg from 'pg';
import { connectionString } from '../../defs.js';

const { Pool } = pkg;

export const pool = new Pool({ connectionString });
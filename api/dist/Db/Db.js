"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
exports.db = new pg_1.Pool({
    host: "localhost",
    user: "apiculteur",
    password: "nous-aimons-les-abeilles",
    database: "api-culteur",
    port: 5432,
});

const { Client } = require("pg");
const bcrypt = require('bcryptjs');

async function main() {
    console.log('..seeding');
    const client = new Client({
        connectionString: "postgresql://postgres:jakub123@localhost:5432/members_only"
    });

    await client.connect();

    const psw = "admin";
    const hashedPsw = await bcrypt.hash(psw, 10); 

    const SQL = `
        INSERT INTO users (firstname, lastname, email, password, is_member, is_admin)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = ['admin', 'admin', 'admin@mail.com', hashedPsw, true, true];

    await client.query(SQL, values);
    await client.end();
    console.log("done");
}

main();



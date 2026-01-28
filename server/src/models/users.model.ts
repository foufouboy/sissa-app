import { query } from "../config/db";

// Intégrer les try/catch et les types précis plus tard
// Puis faire tous les modèles sur ce format
// Faire un model, puis faire des tests

export const UserModel = {
    async findAll() {
        return await query(`SELECT * FROM users`);
    },

    async findById(id: number) {
        return await query(
            `
            SELECT id, email, first_name, last_name, role
            FROM users WHERE id = $1`, 
            [id]
        );
    },

    async create(data: unknown) { // tout sera typé plus tard
        const dataToArray = [...Object.values(data)];

        return await query(
            `
            INSERT INTO users (email, password, first_name, last_name, role)
            VALUES ($1, $2, $3, $4, COALESCE($5, 'member'))
            `, 
            [dataToArray]
        )
    },
}

// TESTS 

async function main() {
    const users = await UserModel.findAll();
    
    users.map((user: any) => {
        console.log(user.email);
    });
}

main();
import { query } from "../config/db";
import { Roles } from "../types/roles";
import { CreateUserInput, User } from "../types/users";

// 1. Créer les types du model
// 2. Créer le model, avec les CRUD de base

export const UserModel = {
    async findAll(): Promise<User[]> {
        try {
            return await query(`SELECT * FROM users`);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
            throw error;
        }
    },

    async findById(id: number) {
        try {
            return await query(
                `SELECT * FROM users WHERE id = $1`, 
                [id]
            );
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, error);
            throw error;
        }
    },

    async create(data: CreateUserInput) {
        try {
            const { email, password, first_name, last_name, role } = data;

            return await query(
                `INSERT INTO users (email, password, first_name, last_name, role)
                VALUES ($1, $2, $3, $4, COALESCE($5, 'member'))`, 
                [email, password, first_name, last_name, role || Roles.Member]
            );
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur:", error);
            throw error;
        }
    },

    async updateById(id: number, data: CreateUserInput) {
        // TODO
    },

    async delete(id: number) {
        try {
            await query(
                `DELETE FROM users
                WHERE id = $1`,
                [id]
            );
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
            throw error;
        }
    }
}

// TESTS 

async function main() {
    const users = await UserModel.findAll();
    
    users.map((user: User) => {
        console.log(user.email);
    });
}

main();
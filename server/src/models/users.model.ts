import { query } from "../config/db";
import { Roles } from "../types/roles";
import { CreateUserInput, User, UserPublic } from "../types/users";
import { toPublicUser, toPublicUsers } from "./dtos/users";

// 1. Créer les types du model
// 2. Créer le model, avec les CRUD de base

export const UserModel = {
    async findAll(): Promise<UserPublic[]> {
        try {
            const result = await query<User>(`SELECT * FROM users`);
            return toPublicUsers(result);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
            throw error;
        }
    },

    async findById(id: number): Promise<UserPublic> {
        try {
            const result = (await query<User>(
                `SELECT * FROM users WHERE id = $1
                LIMIT 1`, 
                [id]
            ));

            if (!result[0]) {
                throw new Error("Utilisateur non trouvé");
            }

            return toPublicUser(result[0]);


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
                VALUES ($1, $2, $3, $4, $5::roles_type)`, 
                [email, password, first_name, last_name, role || Roles.Member]
            );
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur:", error);
            throw error;
        }
    },

    async updateById(id: number, data: CreateUserInput) {
        const { email, first_name, last_name, role } = data; // Pas encore de modifs de mdp

        try {
            return await query(`
                UPDATE users
                SET email = $2,
                    first_name = $3,
                    last_name = $4,
                    role = $5::roles_type,
                    updated_at = NOW()
                WHERE id = $1
            `, [id, email, first_name, last_name, role]);
        } catch (error) {
            console.error("Erreur lors de la modification de l'utilisateur:", error);
            throw error;
        }
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
    const updatedUser: CreateUserInput = {
        email: "emma@test.com",
        first_name: "Emma",
        last_name: "Thompson",
        password: "hashed_password",
        role: Roles.Member
    }

    const result = await UserModel.updateById(5, updatedUser);
    const user = await UserModel.findById(1);

    console.log(result);
    console.log(user);
}

main();
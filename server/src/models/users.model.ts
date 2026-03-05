import { query } from "../config/db";
import { Roles } from "../types/roles";
import { CreateUserInput, PrivateUser, PublicUser } from "../types/users";
import { toPublicUser, toPublicUsers } from "./dtos/users";

// 1. Créer les types du model
// 2. Créer le model, avec les CRUD de base

export const UserModel = {
  async findAll(): Promise<PrivateUser[]> {
    try {
      const result = await query<PrivateUser>(`SELECT * FROM users`);
      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      throw error;
    }
  },

  async findById(id: number): Promise<PrivateUser | null> {
    try {
      const result = await query<PrivateUser>(
        `SELECT * FROM users WHERE id = $1
                LIMIT 1`,
        [id],
      );

      if (!result[0]) return null;

      return result[0];
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de l'utilisateur ${id}:`,
        error,
      );
      throw error;
    }
  },

  async findByIds(ids: number[]): Promise<PublicUser[]> {
    try {
      const result = await query<PrivateUser>(
        `SELECT * FROM users WHERE id = ANY($1)`,
        [ids],
      );
      return toPublicUsers(result);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des utilisateurs par IDs:",
        error,
      );
      throw error;
    }
  },

  async findByEmail(email: string): Promise<PrivateUser | null> {
    try {
      const result = await query<PrivateUser>(
        `SELECT * FROM users WHERE email = $1
				LIMIT 1`,
        [email],
      );

      if (!result[0]) return null;

      return result[0];
    } catch (error) {
      console.error();
      console.error(
        `Erreur lors de la récupération de l'utilisateur ${id}:`,
        error,
      );
      throw error;
    }
  },

  // TODO EN RENTRANT
  // + UNIFORMISER TYPE DE RETOUR DES MODELES

  async findStudentsOf(teacherId: number): Promise<PrivateUser[]> {
    try {
      const result = await query<PrivateUser>(
        `SELECT * FROM users 
		JOIN teachers_students ON users.id = teachers_students.student_id 
		WHERE teachers_students.teacher_id = $1`,
        [teacherId],
      );
      return result;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des étudiants d'un professeur:",
        error,
      );
      throw error;
    }
  },

  async findTeachersOf(studentId: number): Promise<PrivateUser[]> {
    try {
      const result = await query<PrivateUser>(
        `SELECT * FROM users JOIN teachers_students ON users.id = teachers_students.teacher_id WHERE teachers_students.student_id = $1`,
        [studentId],
      );
      return result;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des professeurs d'un étudiant:",
        error,
      );
      throw error;
    }
  },

  async create(data: CreateUserInput): Promise<PublicUser> {
    try {
      const { email, password, firstName, lastName, role } = data;

      const result = await query<PrivateUser>(
        `INSERT INTO users (email, password, first_name, last_name, role)
                VALUES ($1, $2, $3, $4, $5::roles_type) RETURNING *`,
        [email, password, firstName, lastName, role || Roles.Member],
      );

      if (!result[0]) {
        throw new Error("Erreur lors de la création de l'utilisateur");
      }

      return toPublicUser(result[0]);
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      throw error;
    }
  },

  async updateById(id: number, data: CreateUserInput) {
    const { email, firstName, lastName, role } = data; // Pas encore de modifs de mdp

    try {
      return await query(
        `
                UPDATE users
                SET email = $2,
                    first_name = $3,
                    last_name = $4,
                    role = $5::roles_type,
                    updated_at = NOW()
                WHERE id = $1
            `,
        [id, email, firstName, lastName, role],
      );
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
        [id],
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      throw error;
    }
  },
};

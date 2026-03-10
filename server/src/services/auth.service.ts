import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SettingModel } from "../models/settings.model";
import { UserModel } from "../models/users.model";
import { Roles } from "../types/roles";
import { AuthenticatedUser } from "../types/users";

/**
 * Comment authentifier un utilisateur ?
 * On cherche si l'email existe bien dans la bdd
 * On cherche si le mot de passe correspond bien à celui décrypter
 * Si ça c'est bon, on génère le JWT, et on renvoie les données utilisateurs de la connexion
 */

/**
 * Comment enregistrer un utilisateur ?
 * L'utilisateur aura rentré des données qu'il faudra ÉPURER et VALIDER
 * (nom complet, email, password)
 * SI tout est validé :
 * On crypte son mot de passe
 * SINON on renvoie au front les erreurs de validation
 */

export const authService = {
  async login(email: string, password: string) {
    try {
      const user = await UserModel.findByEmail(email);
      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Mot de passe incorrect");
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        },
      );

      return token;
    } catch (error) {
      console.error("Erreur authService.login:", error);
      throw error;
    }
  },

  async register(newUser: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    try {
      // À ce moment là, tout a déjà été validé et sanitizé
      const { email, password, firstName, lastName } = newUser;

      const hash = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
        email,
        password: hash,
        firstName,
        lastName,
        role: Roles.Member,
      });

      await SettingModel.create({
        userId: user.id,
        preferences: {
          darkMode: false,
          language: "fr",
          notifications: true,
        },
      });

      return user;
    } catch (error) {
      console.error("Erreur authService.register:", error);
    }
  },

  isAdmin(user: AuthenticatedUser): boolean {
    return user.role === "admin";
  },

  isTeacher(user: AuthenticatedUser): boolean {
    return user.role === "teacher";
  },

  isAuth(user: AuthenticatedUser): boolean {
    return !!user.role;
  },
};

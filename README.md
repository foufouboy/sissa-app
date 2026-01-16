### Qu'est-ce que Sissa ?

*Sissa* est une application de gestion de clubs d'échecs. Elle est pensée pour être une solution clé-en-main pour ces associations, fournissant d'emblée des fonctionnalités utiles et communes à beaucoup d'associations :
- Un blog sur lequel partager ses articles ;
- Un système de gestion et de visionnage des parties des adhérents ;
- Un système de communication avec les adhérents comprenant notifications et emailing (et plus tard, un live message interne) ;
- Un calendrier des évènements à venir ;
- Une hierarchie de droits (Bureau, Professeur, Membre) permettant une administration souple de l'application et des membres

L'application se veut solide et performante, créée de la façon la plus neutre possible et en respectant au maximum les principes d'un bon développement d'application.

### Arborescence & Organisation générale

```
sissa.app/

	server/    # Une application Express, 3 Layer Architecture
		/api
			/routes
			/controllers
			/middlewares
		/services
			# Tout la logique business
		/models
			# Le layer d'accès à la data brute de l'app.
		/config
		/utils
		/types
		
	client/    # Une application Vite/React, Clean Architecture
		/ src
		
```

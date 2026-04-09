const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const withDelay = <T>(promise: Promise<T>, ms = 700): Promise<T> =>
	Promise.all([promise, sleep(ms)]).then(([result]) => result);

export const truncateString = (str: string, maxLength: number) => {
	if (str.length > maxLength) {
		return str.substring(0, maxLength) + "...";
	}
	return str;
};

export const getRegisterValidationErrorMessage = (validationErrors: any) => {
	if (!Array.isArray(validationErrors) || validationErrors.length === 0) {
		return "Vos champs sont incorrects.\n Vérifiez que vous avez rempli tous les champs correctement et que les mots de passe correspondent.";
	}

	if (
		validationErrors.some((error: any) =>
			error?.path?.includes("firstName"),
		)
	) {
		return "Le prénom est requis, et doit être de plus de deux lettres !";
	}

	if (
		validationErrors.some((error: any) => error?.path?.includes("lastName"))
	) {
		return "Le nom est requis, et doit être de plus de deux lettres !";
	}

	if (validationErrors.some((error: any) => error?.path?.includes("email"))) {
		return "L'email existe déjà, ou n'est pas valide !";
	}

	return "Vos champs sont incorrects.\n Vérifiez que vous avez rempli tous les champs correctement et que les mots de passe correspondent.";
};

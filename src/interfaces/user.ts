export interface User {
	id?: string;
	name?: string;
	username?: string;
	email?: string;
	avatar?: string;
	website?: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface ChangePassword {
	oldPassword: string;
	newPassword: string;
}

export interface AuthResponse {
	token: string;
	user: User;
}

export interface GetUserResponse {
	getUser: User;
}

export interface RegisterData {
	username: string;
	name: string;
	email: string;
	password: string;
}

export interface LoginData {
	email: string;
	password: string;
}
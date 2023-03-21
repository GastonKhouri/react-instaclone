import { AuthResponse } from './';

export interface LoginMutation {
	login: AuthResponse;
}

export interface RegisterMutation {
	register: AuthResponse;
}

export interface UpdateUserMutation {
	updateUser: boolean;
}

export interface UpdateAvatarMutation {
	updateAvatar: {
		avatarUrl: string;
		status: string;
	};
}

export interface DeleteAvatarMutation {
	deleteAvatar: boolean;
}
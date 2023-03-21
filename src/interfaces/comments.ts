import { User } from './user';

export interface Comment {
	id?: string;
	publication?: string;
	text?: string;
	user?: User;
	createdAt?: string;
	updatedAt?: string;
}
import { User } from './';

export interface FileToUpload {
	type: 'image',
	preview: string,
	file: File,
}

export interface Publication {
	id?: string,
	user?: User,
	file?: string,
	fileType?: string,
	createdAt?: string,
}
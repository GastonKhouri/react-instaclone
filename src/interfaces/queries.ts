import { AuthResponse, User, Publication, Comment } from './';

export interface GetUserQuery {
	getUser: User;
};

export interface SearchUsersQuery {
	searchUsers: User[];
};

export interface RenewQuery {
	renew: AuthResponse;
}

export interface IsFollowingQuery {
	isFollowing: boolean;
}

export interface GetFollowersQuery {
	getFollowers: User[];
}

export interface GetFollowingQuery {
	getFollowing: User[];
}

export interface GetPublicationsQuery {
	getPublications: Publication[];
};

export interface GetCommentsQuery {
	getComments: Comment[];
};

export interface GetPublicationsFollowedQuery {
	getPublicationsFollowed: Publication[];
}

export interface GetNotFollowingQuery {
	getNotFollowing: User[];
}
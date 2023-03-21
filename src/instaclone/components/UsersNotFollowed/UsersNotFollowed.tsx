import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

import { GET_NOT_FOLLOWING } from '../../../gql/follow';
import { GetNotFollowingQuery } from '../../../interfaces';

import './usersNotFollowed.scss';

export const UsersNotFollowed = () => {

	const { data, loading } = useQuery<GetNotFollowingQuery>( GET_NOT_FOLLOWING );

	if ( loading ) return <></>;

	const { getNotFollowing: users } = data!;

	return (
		<div className="users-not-followed">
			<h3>Usuarios no seguidos</h3>
			{
				users.map( user => (
					<Link
						key={ user.id }
						to={ `/${ user.username }` }
						className="users-not-followed__user"
					>
						<Image src={ user.avatar || '/assets/png/avatar.png' } avatar />
						<span>{ user.username }</span>
					</Link>
				) )
			}
		</div>
	);
};

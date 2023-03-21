
import { useFollowers } from '../../../hooks';

import './followers.scss';

interface Props {
	username: string;
	totalPublications: number;
}

export const Followers = ( { username, totalPublications }: Props ) => {

	const { followersData, followingData, handleModal, followersLoading, followingLoading } = useFollowers( username );

	if ( followersLoading || followingLoading ) return null;

	const { getFollowers: followers } = followersData!;
	const { getFollowing: following } = followingData!;

	return (
		<div className="followers">
			<p><span>{ totalPublications }</span> publicaciones</p>
			<p onClick={ () => handleModal( 'followers', followers ) } className="link">
				<span>{ followers.length }</span> seguidores
			</p>
			<p onClick={ () => handleModal( 'following', following ) } className="link">
				<span>{ following.length }</span> seguidos
			</p>
		</div>
	);
};

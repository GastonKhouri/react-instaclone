import { Image, Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { useSearchUsers } from '../../../hooks';

import './searchUsers.scss';

export const SearchUsers = () => {

	const {
		searchText,
		handleSearchChange,
		loading,
		users,
		handleResultSelect,
	} = useSearchUsers();

	return (
		<Search
			className="search-users"
			fluid
			input={ { icon: 'search', iconPosition: 'left' } }
			placeholder="Buscar usuarios..."
			value={ searchText }
			onSearchChange={ ( _, { value } ) => handleSearchChange( value ) }
			loading={ loading }
			results={ users }
			resultRenderer={ user => <ResultItem user={ user } /> }
			onResultSelect={ ( _, { result } ) => handleResultSelect( result ) }
		/>
	);
};

const ResultItem = ( { user }: any ) => {

	return (
		<Link className="search-users__item" to={ `/${ user.username }` }>
			<Image src={ user?.avatar || '/assets/png/avatar.png' } avatar />
			<div>
				<p>{ user.title }</p>
				<p>{ user.username }</p>
			</div>
		</Link>
	);

};

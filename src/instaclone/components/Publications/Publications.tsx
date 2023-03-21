import { Grid } from 'semantic-ui-react';

import { PreviewPublication } from './PreviewPublication';
import { Publication } from '../../../interfaces';

import './publications.scss';

interface Props {
	publications: Publication[];
}

export const Publications = ( { publications }: Props ) => {

	return (
		<div className="publications">
			<h1>Publicaciones</h1>
			<Grid columns={ 3 } >
				{
					publications.map( publication => (
						<Grid.Column key={ publication.id }>
							<PreviewPublication publication={ publication } />
						</Grid.Column>
					) )
				}
			</Grid>
		</div>
	);
};

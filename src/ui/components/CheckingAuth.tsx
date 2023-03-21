import { Container } from 'semantic-ui-react';


export const CheckingAuth = () => {
	return (
		<Container fluid className='checking'>

			<div>
				<p></p>
				<div className="ui active inverted dimmer">
					<div className="ui loader"></div>
				</div>
			</div>

		</Container>
	);
};
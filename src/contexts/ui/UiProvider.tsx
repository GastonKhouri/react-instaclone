import { FC, useState } from 'react';
import { UiContext } from './';

export interface UiState {
	showModal: boolean;
}

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const UiProvider: FC<Props> = ( { children } ) => {

	const [ showModal, setShowModal ] = useState( false );
	const [ modalTitle, setModalTitle ] = useState( '' );
	const [ modalChildren, setModalChildren ] = useState<JSX.Element>();

	const onOpenModal = () => {
		setShowModal( true );
	};

	const onCloseModal = () => {
		setShowModal( false );
		setModalChildren( undefined );
		setModalTitle( '' );
	};

	const onSetModalTitle = ( title: string ) => {
		setModalTitle( title );
	};

	const onSetModalChildren = ( children: JSX.Element ) => {
		setModalChildren( children );
	};

	return (
		<UiContext.Provider value={ {
			showModal,
			onOpenModal,
			onCloseModal,
			modalTitle,
			modalChildren,
			onSetModalTitle,
			onSetModalChildren,
		} }>
			{ children }
		</UiContext.Provider>
	);
};
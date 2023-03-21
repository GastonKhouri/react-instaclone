import { createContext } from 'react';

interface ContextProps {
	showModal: boolean;
	modalTitle: string;
	modalChildren: JSX.Element | undefined;
	onOpenModal: () => void;
	onCloseModal: () => void;
	onSetModalTitle: ( title: string ) => void;
	onSetModalChildren: ( children: JSX.Element ) => void;
}

export const UiContext = createContext( {} as ContextProps );
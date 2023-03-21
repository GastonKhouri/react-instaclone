import { useFormik } from 'formik';
import { Form, Button } from 'semantic-ui-react';
import * as Yup from 'yup';

import { useSubmitForms } from '../../../hooks';
import { Publication } from '../../../interfaces';

import './modalPublication.scss';

const commentSchema = Yup.object( {
	comment: Yup.string()
		.trim()
		.required( 'Campo obligatorio.' ),
} );

interface Props {
	publication: Publication;
}

export const CommentForm = ( { publication }: Props ) => {

	const { onSubmitCommentForm } = useSubmitForms();

	const { handleSubmit, values, handleChange, isValid, resetForm } = useFormik( {
		initialValues: {
			comment: '',
		},
		validationSchema: commentSchema,
		onSubmit: async ( values ) => {

			const isPublished = await onSubmitCommentForm( {
				publication: publication.id!,
				comment: values.comment,
			} );

			if ( isPublished ) {
				resetForm( {
					values: {
						comment: '',
					},
				} );
			}

		}
	} );

	return (
		<Form className="comment-form" onSubmit={ handleSubmit }>
			<Form.Input
				placeholder="Añade un comentario..."
				name="comment"
				value={ values.comment }
				onChange={ handleChange }
				autoComplete="off"
			/>
			<Button
				type="submit"
				disabled={ !isValid }
			>
				Publicar
			</Button>
		</Form>
	);
};

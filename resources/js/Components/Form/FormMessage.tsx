import { cn } from '@narsil-ui/Components';
import * as React from 'react';
import useFormField from './use-form-field';

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
	({ className, children, ...props }, ref) => {
		const { error, formMessageId } = useFormField();
		const body = error ? String(error?.message) : children;

		if (!body) {
			return null;
		}

		return (
			<p
				ref={ref}
				id={formMessageId}
				className={cn('text-sm font-medium text-destructive', className)}
				{...props}
			>
				{body}
			</p>
		);
	}
);

export default FormMessage;

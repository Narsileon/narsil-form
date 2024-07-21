import { cn, Label } from '@narsil-ui/Components';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';
import useFormField from './use-form-field';

const FormLabel = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
	const { error, formItemId } = useFormField();

	return (
		<Label
			ref={ref}
			className={cn(error && 'text-destructive', className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
});

export default FormLabel;

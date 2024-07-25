import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import useFormField from "./use-form-field";

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
	({ ...props }, ref) => {
		const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

		return (
			<Slot
				ref={ref}
				id={formItemId}
				aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
				aria-invalid={!!error}
				{...props}
			/>
		);
	}
);

export default FormControl;

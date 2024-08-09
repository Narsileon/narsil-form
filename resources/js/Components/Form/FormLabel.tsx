import { cn } from "@narsil-ui/Components";
import { Label } from "@narsil-forms/Components";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";
import useFormField from "./useFormField";

const FormLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, FormLabelProps>(
	({ className, ...props }, ref) => {
		const { error, formItemId } = useFormField();

		return (
			<Label
				ref={ref}
				className={cn(error && "text-destructive", className)}
				htmlFor={formItemId}
				{...props}
			/>
		);
	}
);

export default FormLabel;

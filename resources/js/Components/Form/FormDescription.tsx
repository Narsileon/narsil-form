import { cn } from "@narsil-ui/Components";
import * as React from "react";
import useFormField from "./use-form-field";

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => {
		const { formDescriptionId } = useFormField();

		return (
			<p
				ref={ref}
				id={formDescriptionId}
				className={cn("text-sm text-muted-foreground", className)}
				{...props}
			/>
		);
	}
);

export default FormDescription;

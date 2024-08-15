import { cn } from "@narsil-ui/Components";
import * as React from "react";
import useFormField from "./useFormField";

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
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
				className={cn("text-destructive text-sm font-medium", className)}
				{...props}
			>
				{body}
			</p>
		);
	}
);

export default FormMessage;

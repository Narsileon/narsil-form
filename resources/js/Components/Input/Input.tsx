import { cn } from "@narsil-ui/Components";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => (
	<input
		ref={ref}
		type={type}
		className={cn(
			"flex h-9 w-full rounded-md border border-input bg-background p-2 text-sm ring-offset-background ",
			"placeholder:text-muted-foreground",
			"file:border-0 file:bg-transparent file:text-sm file:font-medium",
			"focus-visible:outline-none focus-visible:border-primary",
			"disabled:cursor-not-allowed disabled:opacity-50",
			className
		)}
		{...props}
	/>
));

export default Input;

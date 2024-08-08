import { cn } from "@narsil-ui/Components";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => (
	<input
		ref={ref}
		type={type}
		className={cn(
			"border-input bg-background ring-offset-background flex h-9 w-full rounded-md border px-4 py-2 text-sm",
			"placeholder:text-muted-foreground",
			"file:border-0 file:bg-transparent file:text-sm file:font-medium",
			"focus-visible:border-primary focus-visible:outline-none",
			"disabled:cursor-not-allowed disabled:opacity-50",
			className
		)}
		{...props}
	/>
));

export default Input;

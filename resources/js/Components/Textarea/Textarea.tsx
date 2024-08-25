import { cn } from "@narsil-ui/Components";
import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
	<textarea
		ref={ref}
		className={cn(
			"border-input bg-background ring-offset-background flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm",
			"placeholder:text-muted-foreground",
			"focus-visible:ring-primary-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
			"disabled:cursor-not-allowed disabled:opacity-50",
			className
		)}
		{...props}
	/>
));

export default Textarea;

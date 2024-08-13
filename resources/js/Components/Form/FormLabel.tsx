import { Asterisk } from "lucide-react";
import { cn, Label, TooltipWrapper } from "@narsil-ui/Components";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";
import useFormField from "./useFormField";

const FormLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, FormLabelProps>(
	({ children, className, required = false, ...props }, ref) => {
		const { trans } = useTranslationsStore();

		const { error, formItemId } = useFormField();

		return (
			<Label
				ref={ref}
				className={cn("flex items-center gap-x-1", error && "text-destructive", className)}
				htmlFor={formItemId}
				{...props}
			>
				{children}
				{required ? (
					<TooltipWrapper tooltip={trans("Required")}>
						<Asterisk className='h-3 w-3'></Asterisk>
					</TooltipWrapper>
				) : null}
			</Label>
		);
	}
);

export default FormLabel;

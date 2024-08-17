import { Asterisk } from "lucide-react";
import { cn } from "@narsil-ui/Components";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";
import Label from "@narsil-ui/Components/Label/Label";
import useFormField from "./useFormField";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";

export interface FormLabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
	required?: boolean;
}

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

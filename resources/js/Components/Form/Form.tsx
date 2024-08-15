import { cn } from "@narsil-ui/Components";
import { router } from "@inertiajs/react";
import { FieldValues, useFormContext } from "react-hook-form";
import * as React from "react";

export type SubmitParametersType = {
	preserveScroll?: boolean;
	preserveState?: boolean;
	onError?: (errors: Record<string, string>) => void;
	onSuccess?: () => void;
};

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
	className?: string;
	method?: "patch" | "post";
	route: string;
	submitParameters?: SubmitParametersType;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
	({ className, children, method = "post", route, submitParameters = {}, ...props }, ref) => {
		const form = useFormContext();

		const onValid = async (values: FieldValues) => {
			submitParameters = {
				onError: (errors) => {
					Object.entries(errors).map(([attribute, error]) => {
						form.setError(attribute, {
							type: "server",
							message: error,
						});
					});
				},
				...submitParameters,
			};

			try {
				switch (method) {
					case "patch":
						router.patch(route, values, submitParameters);
						break;
					case "post":
						router.post(route, values, submitParameters);
						break;
				}
			} catch (e) {}
		};

		return (
			<form
				ref={ref}
				className={cn("w-full space-y-4", className)}
				onSubmit={(event) => {
					event.stopPropagation();
					form.handleSubmit(onValid)(event);
				}}
				{...props}
			>
				{children}
			</form>
		);
	}
);

export default Form;

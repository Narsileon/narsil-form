import { cn } from "@narsil-ui/Components";
import { router } from "@inertiajs/react";
import { useFormContext } from "react-hook-form";
import * as React from "react";

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
	className?: string;
	method?: "patch" | "post";
	route: string;
	submitParameters?: any;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
	({ className, children, method = "post", route, submitParameters = {}, ...props }, ref) => {
		const form = useFormContext();

		const onSubmit = async (values: any) => {
			submitParameters = {
				onError: (errors: Record<string, string>) => {
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
				onSubmit={form.handleSubmit(onSubmit)}
				{...props}
			>
				{children}
			</form>
		);
	}
);

export default Form;

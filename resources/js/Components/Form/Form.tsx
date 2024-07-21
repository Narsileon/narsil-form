import { cn } from '@narsil-ui/Components';
import { FormProvider, FormProviderProps } from 'react-hook-form';
import { router } from '@inertiajs/react';
import * as React from 'react';

interface FormProps extends FormProviderProps {
	className?: string;
	method?: 'patch' | 'post';
	route: string;
	submitParameters?: any;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
	({ className, children, method = 'post', route, submitParameters = {}, ...form }, ref) => {
		const onSubmit = async (values: any) => {
			submitParameters = {
				onError: (errors: Record<string, string>) => {
					Object.entries(errors).map(([attribute, error]) => {
						form.setError(attribute, {
							type: 'server',
							message: error,
						});
					});
				},
				...submitParameters,
			};

			try {
				switch (method) {
					case 'patch':
						router.patch(route, values, submitParameters);
						break;
					case 'post':
						router.post(route, values, submitParameters);
						break;
				}
			} catch (e) {}
		};

		return (
			<FormProvider {...form}>
				<form
					className={cn('w-full space-y-4', className)}
					ref={ref}
					onSubmit={form.handleSubmit(onSubmit)}
				>
					{children}
				</form>
			</FormProvider>
		);
	}
);

export default Form;

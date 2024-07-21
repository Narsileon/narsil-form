import { cn } from '@narsil-ui/Components';
import * as React from 'react';

type FormItemContextValue = {
	id: string;
};

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: 'horizontal' | 'vertical';
}

export const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
	({ className, orientation = 'vertical', ...props }, ref) => {
		const id = React.useId();

		return (
			<FormItemContext.Provider value={{ id }}>
				<div
					ref={ref}
					className={cn(orientation === 'horizontal' ? 'flex items-center space-x-2' : 'space-y-2', className)}
					{...props}
				/>
			</FormItemContext.Provider>
		);
	}
);

export default FormItem;

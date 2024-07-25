import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import * as React from "react";

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	name: TName;
};

export const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	...props
}: ControllerProps<TFieldValues, TName>) => (
	<FormFieldContext.Provider value={{ name: props.name }}>
		<Controller {...props} />
	</FormFieldContext.Provider>
);

export default FormField;

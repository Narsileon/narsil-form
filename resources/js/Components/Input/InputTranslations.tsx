import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { TranslationModel } from "@narsil-localization/Types";
import { useLanguageContext } from "@narsil-localization/Components/Language/LanguageProvider";
import * as React from "react";
import AsyncCombobox from "@narsil-ui/Components/Combobox/AsyncCombobox";
import Card from "@narsil-ui/Components/Card/Card";
import CardContent from "@narsil-ui/Components/Card/CardContent";
import Input from "@narsil-ui/Components/Input/Input";

export type InputTranslationType = TranslationModel & {
	values: Record<string, string>;
};

export interface InputTranslationsProps extends ControllerRenderProps {
	fieldTranslations: InputTranslationType;
	setValue: UseFormReturn["setValue"];
}

const InputTranslations = React.forwardRef<HTMLDivElement, InputTranslationsProps>(
	({ fieldTranslations, setValue, ...props }, ref) => {
		const { contextLanguage } = useLanguageContext();

		const [InputTranslations, setInputTranslations] = React.useState<InputTranslationType>(fieldTranslations);

		return (
			<Card ref={ref}>
				<CardContent>
					<AsyncCombobox
						fetch={route("translations.fetch")}
						value={InputTranslations?.id}
						valueKey='id'
						labelKey={`values.${contextLanguage?.locale}`}
						onChange={(value) => setInputTranslations(value)}
					/>
					<div className='flex items-center'>
						<Input
							className='rounded-r-none'
							{...props}
						/>
					</div>
				</CardContent>
			</Card>
		);
	}
);

export default InputTranslations;

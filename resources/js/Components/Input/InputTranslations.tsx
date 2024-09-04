import { ChevronDown } from "lucide-react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { TranslationModel } from "@narsil-localization/Types";
import { upperCase } from "lodash";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import AsyncCombobox from "@narsil-ui/Components/Combobox/AsyncCombobox";
import Button from "@narsil-ui/Components/Button/Button";
import Card from "@narsil-ui/Components/Card/Card";
import CardContent from "@narsil-ui/Components/Card/CardContent";
import DropdownMenu from "@narsil-ui/Components/DropdownMenu/DropdownMenu";
import DropdownMenuContent from "@narsil-ui/Components/DropdownMenu/DropdownMenuContent";
import DropdownMenuItem from "@narsil-ui/Components/DropdownMenu/DropdownMenuItem";
import DropdownMenuTrigger from "@narsil-ui/Components/DropdownMenu/DropdownMenuTrigger";
import Input from "@narsil-ui/Components/Input/Input";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";

export type InputTranslationType = TranslationModel & {
	values: Record<string, string>;
};

export interface InputTranslationsProps extends ControllerRenderProps {
	fieldTranslations: InputTranslationType;
	setValue: UseFormReturn["setValue"];
}

const InputTranslations = React.forwardRef<HTMLDivElement, InputTranslationsProps>(
	({ fieldTranslations, setValue, ...props }, ref) => {
		const { languages, locale, translations, trans } = useTranslationsStore();

		const [inputLocale, setInputLocale] = React.useState<string>(locale);
		const [InputTranslations, setInputTranslations] = React.useState<InputTranslationType>(fieldTranslations);

		return (
			<Card ref={ref}>
				<CardContent>
					<AsyncCombobox
						fetch={route("translations.fetch")}
						value={InputTranslations?.id}
						valueKey='id'
						labelKey={`values.${locale}`}
						onChange={(value) => setInputTranslations(value)}
					/>
					<div className='flex items-center'>
						<Input
							className='rounded-r-none'
							{...props}
						/>
						<DropdownMenu>
							<TooltipWrapper tooltip={trans("language")}>
								<DropdownMenuTrigger asChild={true}>
									<Button
										className='w-20 min-w-20 justify-between rounded-l-none'
										variant='secondary'
									>
										{upperCase(inputLocale)}
										<ChevronDown className='h-5 w-5 transition-transform duration-200 group-aria-expanded:rotate-180' />
									</Button>
								</DropdownMenuTrigger>
							</TooltipWrapper>

							<DropdownMenuContent>
								{languages.map((language, index) => {
									return (
										<DropdownMenuItem
											onClick={() => {
												setInputLocale(language.locale);
											}}
											key={index}
										>
											{language.language}
										</DropdownMenuItem>
									);
								})}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardContent>
			</Card>
		);
	}
);

export default InputTranslations;

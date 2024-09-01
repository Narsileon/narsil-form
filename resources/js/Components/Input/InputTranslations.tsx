import { ChevronDown } from "lucide-react";
import { cn } from "@narsil-ui/Components";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { TranslationModel } from "@narsil-localization/Types";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import Combobox from "@narsil-ui/Components/Combobox/Combobox";
import DropdownMenu from "@narsil-ui/Components/DropdownMenu/DropdownMenu";
import DropdownMenuTrigger from "@narsil-ui/Components/DropdownMenu/DropdownMenuTrigger";
import Input from "@narsil-ui/Components/Input/Input";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import AsyncCombobox from "@narsil-ui/Components/Combobox/AsyncCombobox";

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
			<div ref={ref}>
				<AsyncCombobox
					fetch={"translations.fetch"}
					value={InputTranslations.id}
					valueKey='id'
					labelKey='value'
				/>
				<DropdownMenu>
					<TooltipWrapper tooltip={trans("language")}>
						<DropdownMenuTrigger
							className='group'
							asChild={true}
						>
							<Button className={cn("gap-x-1")}>
								{inputLocale}
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
				<Input
					value={inp}
					{...props}
				/>
			</div>
		);
	}
);

export default InputTranslations;

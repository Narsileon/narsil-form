import { Check, ChevronsUpDown } from "lucide-react";
import { debounce, isString, sortBy, upperFirst } from "lodash";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";
import axios from "axios";

import {
	Button,
	cn,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandLoading,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Svg,
} from "@narsil-ui/Components";

export type SelectOption = {
	label?: string;
	value?: string | number;
	options?: SelectOption[];
	[key: string]: any;
};

interface AsyncComboboxProps {
	fetch: string;
	labelKey?: string;
	preview?: "icon" | "image";
	sort?: boolean;
	ucFirst?: boolean;
	value: string | number;
	valueKey?: string;
	onChange: (value: number | string) => void;
}

const AsyncCombobox = React.forwardRef<
	React.ElementRef<typeof PopoverPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & AsyncComboboxProps
>(({ fetch, labelKey = "label", preview, sort = true, ucFirst = true, value, valueKey = "value", onChange }, ref) => {
	const { trans } = useTranslationsStore();

	const [open, setOpen] = React.useState(false);
	const [option, setOption] = React.useState<SelectOption | null>(null);
	const [options, setOptions] = React.useState<SelectOption[]>([]);

	const [loading, setLoading] = React.useState(false);
	const [search, setSearch] = React.useState<string>("");

	const getValueOption = (value: string | number) => {
		return options?.find((option) => option[valueKey] === value)?.[labelKey] ?? value;
	};

	const fetchOptions = async (search: string) => {
		try {
			const response = await axios.get(fetch, {
				params: {
					search: search,
				},
			});

			return response.data.data;
		} catch (error) {
			console.error("Error fetching options:", error);

			return [];
		}
	};

	const debouncedFetchOptions = React.useCallback(
		debounce(async (search) => {
			if (search.length > 2) {
				setLoading(true);

				let options = await fetchOptions(search);

				if (sort) {
					options = sortBy(options, (option) => option[labelKey].toLowerCase());
				}

				setOptions(options);

				setLoading(false);
			} else {
				setOptions([]);
			}
		}, 300),
		[fetch, labelKey, sort]
	);

	React.useEffect(() => {
		debouncedFetchOptions(search);
	}, [search, debouncedFetchOptions]);

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild={true}>
				<Button
					aria-expanded={open}
					className='w-full justify-start gap-x-2'
					role='combobox'
					variant='outline'
				>
					{option ? (
						<>
							{preview === "icon" ? <Svg src={`/storage/icons/${option?.[labelKey]}`} /> : null}

							<span className='grow text-left'>
								{ucFirst ? upperFirst(option?.[labelKey]) : getValueOption(option?.[labelKey])}
							</span>
						</>
					) : (
						trans("Select...")
					)}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='p-0'
				align='start'
			>
				<Command shouldFilter={false}>
					<CommandInput
						placeholder={trans("Search...")}
						className='h-9'
						value={search}
						onValueChange={setSearch}
					/>
					<CommandList
						className='min-h-10'
						key={options.length}
					>
						{loading ? <CommandLoading>{trans("Search...")}</CommandLoading> : null}
						<CommandGroup>
							{options.map((option, index) => {
								const optionLabel = isString(option) ? option : option[labelKey];
								const optionValue = isString(option) ? option : option[valueKey];

								return (
									<CommandItem
										className='gap-x-2'
										value={optionValue}
										onSelect={() => {
											onChange(optionValue);
											setOption(option);
											setOpen(false);
										}}
										key={optionValue}
									>
										{preview === "icon" ? <Svg src={`/storage/icons/${optionLabel}`} /> : null}
										{ucFirst ? upperFirst(optionLabel) : optionLabel}
										<Check
											className={cn(
												"ml-auto h-4 w-4",
												value === optionValue ? "opacity-100" : "opacity-0"
											)}
										/>
									</CommandItem>
								);
							})}
						</CommandGroup>
						<CommandEmpty>{!loading ? trans("No options.") : ""}</CommandEmpty>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
});

export default AsyncCombobox;

import { sortBy } from "lodash";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as React from "react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@narsil-ui/Components";

const InputPlaceholders = React.forwardRef<HTMLDivElement, InputPlaceholdersProps>(
	({ placeholders, sort = true, onInsert, ...props }, ref) => {
		const { trans } = useTranslationsStore();

		if (sort) {
			placeholders = sortBy(placeholders, (placeholder) => placeholder.label);
		}

		return (
			<Collapsible
				ref={ref}
				{...props}
			>
				<CollapsibleTrigger>{trans("Placeholders")}</CollapsibleTrigger>

				<CollapsibleContent>
					<Table className='w-full'>
						<TableHeader>
							<TableRow>
								<TableHead>{trans("Label")}</TableHead>
								<TableHead>{trans("Placeholder")}</TableHead>
								<TableHead>{trans("Example")}</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{placeholders.map((placeholder, index) => {
								return (
									<TableRow
										className='cursor-pointer'
										onClick={() => onInsert(`{ ${placeholder.value} }`)}
										key={index}
									>
										<TableCell>{placeholder.label}</TableCell>
										<TableCell>{`{ ${placeholder.value} }`}</TableCell>
										<TableCell>{placeholder.example}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</CollapsibleContent>
			</Collapsible>
		);
	}
);

export default InputPlaceholders;

import { sortBy } from "lodash";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as React from "react";
import Collapsible, { CollapsibleProps } from "@narsil-ui/Components/Collapsible/Collapsible";
import CollapsibleContent from "@narsil-ui/Components/Collapsible/CollapsibleContent";
import CollapsibleTrigger from "@narsil-ui/Components/Collapsible/CollapsibleTrigger";
import Table from "@narsil-ui/Components/Table/Table";
import TableBody from "@narsil-ui/Components/Table/TableBody";
import TableCell from "@narsil-ui/Components/Table/TableCell";
import TableHead from "@narsil-ui/Components/Table/TableHead";
import TableHeader from "@narsil-ui/Components/Table/TableHeader";
import TableRow from "@narsil-ui/Components/Table/TableRow";

export interface InputPlaceholdersProps extends CollapsibleProps {
	placeholders: InputPlaceholderType[];
	sort?: boolean;
	onInsert: (value: string) => void;
}

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

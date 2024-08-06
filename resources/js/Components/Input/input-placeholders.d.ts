type InputPlaceholderType = {
	example?: string;
	label: string;
	value: string;
};

interface InputPlaceholdersProps extends CollapsibleProps {
	placeholders: InputPlaceholderType[];
	sort?: boolean;
	onInsert: (value: string) => void;
}

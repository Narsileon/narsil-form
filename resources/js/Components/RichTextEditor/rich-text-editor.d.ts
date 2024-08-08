interface RichTextEditorProps {
	className?: string;
	placeholders?: InputPlaceholderType[];
	value: string;
	onChange: (value: any) => void;
}

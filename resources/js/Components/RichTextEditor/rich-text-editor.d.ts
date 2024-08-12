type RichTextEditorProps = import("@tiptap/react").Editor & {
	className?: string;
	placeholders?: InputPlaceholderType[];
	value: string;
	onChange: (value: any) => void;
};

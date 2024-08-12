type RichTextEditorProps = Partial<import("@tiptap/react").EditorOptions> & {
	className?: string;
	placeholders?: InputPlaceholderType[];
	value: string;
	onChange: (value: any) => void;
};

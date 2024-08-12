type RichTextEditorProps = Partial<import("@tiptap/react").EditorOptions> & {
	className?: string;
	placeholders?: InputPlaceholderType[];
	toolbar?: boolean;
	value: string;
	onChange?: (value: any) => void;
};

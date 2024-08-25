import { BubbleMenu, EditorContent, EditorOptions, FloatingMenu, useEditor } from "@tiptap/react";
import { cn } from "@narsil-ui/Components";
import * as React from "react";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import InputPlaceholders, { InputPlaceholderType } from "@narsil-forms/Components/Input/InputPlaceholders";
import RichTextEditorToolbar from "./RichTextEditorToolbar";
import StarterKit from "@tiptap/starter-kit";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";

type RichTextEditorProps = Partial<EditorOptions> & {
	className?: string;
	placeholders?: InputPlaceholderType[];
	toolbar?: boolean;
	value: string;
	onChange?: (value: any) => void;
};

const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
	({ className, placeholders, toolbar = true, value, onChange, ...props }, ref) => {
		const extensions = [
			Color,
			Highlight.configure({
				multicolor: true,
			}),
			StarterKit,
			Subscript,
			Superscript,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			TextStyle,
			Underline,
		];

		const editor = useEditor({
			extensions: extensions,
			content: value,
			editorProps: {
				attributes: {
					class: cn(
						"prose max-w-none text-foreground !whitespace-normal",
						"rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground",
						"focus-visible:outline-none focus-visible:border-primary-highlight",
						"disabled:cursor-not-allowed disabled:opacity-50",
						className
					),
				},
			},
			onUpdate: ({ editor }) => {
				onChange?.(editor.getHTML());
			},
			...props,
		});

		React.useEffect(() => {
			if (editor && editor?.getHTML() !== value) {
				editor?.commands.setContent(value);
			}
		}, [value]);

		return (
			<div className='flex flex-col gap-y-4'>
				{toolbar && editor?.isEditable ? <RichTextEditorToolbar editor={editor} /> : null}

				<EditorContent editor={editor} />

				<FloatingMenu editor={editor}>
					<></>
				</FloatingMenu>

				<BubbleMenu editor={editor}>
					<></>
				</BubbleMenu>

				{placeholders ? (
					<InputPlaceholders
						placeholders={placeholders}
						onInsert={(value) => editor?.commands.insertContentAt(editor.state.selection, value)}
					/>
				) : null}
			</div>
		);
	}
);

export default RichTextEditor;

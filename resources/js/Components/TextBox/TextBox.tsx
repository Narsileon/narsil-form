import { cn } from "@narsil-ui/Components";
import { EditorContent, EditorOptions, useEditor } from "@tiptap/react";
import * as React from "react";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import TipTapBubbleMenu from "@narsil-forms/Components/TipTap/TipTapBubbleMenu";
import TipTapToolbar from "@narsil-forms/Components/TipTap/TipTapToolbar";
import Underline from "@tiptap/extension-underline";

type TextBoxProps = Partial<EditorOptions> & {
	className?: string;
	id?: string;
	value: string;
	onChange?: (value: any) => void;
};

const TextBox = React.forwardRef<HTMLDivElement, TextBoxProps>(({ className, id, value, onChange, ...props }, ref) => {
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
		<div
			ref={ref}
			className='flex flex-col gap-y-4'
		>
			{toolbar && editor?.isEditable ? <TipTapToolbar editor={editor} /> : null}

			<EditorContent
				id={id}
				editor={editor}
			/>

			<TipTapBubbleMenu editor={editor} />
		</div>
	);
});

export default TextBox;

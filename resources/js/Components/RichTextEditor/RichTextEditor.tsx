import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react';
import { cn } from '@narsil-ui/Components';
import * as React from 'react';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import RichTextEditorToolbar from './RichTextEditorToolbar';
import StarterKit from '@tiptap/starter-kit';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';

interface RichTextEditorProps {
	className?: string;
	value: string;
	onChange: (value: any) => void;
}

const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(({ className, value, onChange }, ref) => {
	const extensions = [
		Color,
		Highlight.configure({
			multicolor: true,
		}),
		StarterKit,
		Subscript,
		Superscript,
		TextAlign.configure({
			types: ['heading', 'paragraph'],
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
					'prose max-w-none text-foreground',
					'rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground',
					'focus-visible:outline-none focus-visible:border-primary',
					'disabled:cursor-not-allowed disabled:opacity-50',
					className
				),
			},
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	React.useEffect(() => {
		editor?.commands.setContent(value);
		console.log(value);
	}, [value]);

	return (
		<>
			<RichTextEditorToolbar editor={editor} />

			<EditorContent editor={editor} />

			<FloatingMenu editor={editor}>
				<></>
			</FloatingMenu>

			<BubbleMenu editor={editor}>
				<></>
			</BubbleMenu>
		</>
	);
});

export default RichTextEditor;

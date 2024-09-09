import { cn } from "@narsil-ui/Components";
import { EditorContent, EditorOptions, useEditor } from "@tiptap/react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import TipTapBubbleMenu from "@narsil-forms/Components/TipTap/TipTapBubbleMenu";
import Underline from "@tiptap/extension-underline";

type TextBoxProps = Partial<EditorOptions> & {
	className?: string;
	id?: string;
	value: string;
	onChange?: (value: any) => void;
};

const TextBox = React.forwardRef<HTMLDivElement, TextBoxProps>(({ className, id, value, onChange, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const [isFocused, setIsFocused] = React.useState(false);

	const extensions = [
		Color,
		Highlight.configure({
			multicolor: true,
		}),
		StarterKit,
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
					"disabled:cursor-not-allowed disabled:opacity-50",
					"focus:outline-none",
					"placeholder:text-muted-foreground"
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
			className={cn(
				"border-border bg-background ring-offset-background flex grow items-stretch gap-x-4 rounded-md border px-4 py-2 text-sm",
				{ "border-primary-highlight": isFocused },
				className
			)}
			onClick={() => editor?.commands.focus()}
		>
			<div className='grow'>
				<EditorContent
					id={id}
					editor={editor}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>
				<TipTapBubbleMenu editor={editor} />
			</div>
			<div className='flex flex-col justify-end'>
				<Button>{trans("Send")}</Button>
			</div>
		</div>
	);
});

export default TextBox;

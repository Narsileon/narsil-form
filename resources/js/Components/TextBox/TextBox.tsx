import { cn } from "@narsil-ui/Components";
import { EditorContent, EditorOptions, useEditor } from "@tiptap/react";
import { Send } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import TipTapBubbleMenu from "@narsil-tiptap/Components/TipTapBubbleMenu";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import Underline from "@tiptap/extension-underline";

type TextBoxProps = Partial<EditorOptions> & {
	className?: string;
	id?: string;
	placeholder?: string;
	value: string;
	onChange?: (value: any) => void;
};

const TextBox = React.forwardRef<HTMLDivElement, TextBoxProps>(
	({ className, id, placeholder, value, onChange, ...props }, ref) => {
		const { trans } = useTranslationsStore();

		const sendLabel = trans("Send");

		const [isFocused, setIsFocused] = React.useState(false);

		const extensions = [
			Color,
			Highlight.configure({
				multicolor: true,
			}),
			Placeholder.configure({
				emptyEditorClass:
					"before:text-sm before:pointer-events-none before:float-left before:h-0 before:text-muted-foreground before:content-[attr(data-placeholder)]",
				placeholder: placeholder,
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
						"prose max-w-none text-foreground !whitespace-normal text-sm",
						"disabled:cursor-not-allowed disabled:opacity-50",
						"focus:outline-none"
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
					"border-border bg-background flex grow items-stretch gap-x-3.5 rounded-md border py-2 pl-3.5 pr-2",
					{ "ring-primary ring-2 ring-offset-2": isFocused },
					className
				)}
				onClick={() => editor?.commands.focus()}
			>
				<div className='grow overflow-hidden'>
					<EditorContent
						id={id}
						editor={editor}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
					/>
					<TipTapBubbleMenu editor={editor} />
				</div>
				<div className='flex flex-col justify-end'>
					<TooltipWrapper tooltip={sendLabel}>
						<Button
							aria-label={sendLabel}
							size='icon'
							type='submit'
						>
							<Send className='h-6 w-6' />
						</Button>
					</TooltipWrapper>
				</div>
			</div>
		);
	}
);

export default TextBox;

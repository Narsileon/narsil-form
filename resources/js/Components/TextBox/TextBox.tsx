import { cn } from "@narsil-ui/Components";
import { EditorContent, EditorOptions, useEditor } from "@tiptap/react";
import { Link } from "@inertiajs/react";
import { Send } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import TipTapBubbleMenu from "@narsil-forms/Components/TipTap/TipTapBubbleMenu";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { InertiaLinkProps } from "@inertiajs/react";
import Underline from "@tiptap/extension-underline";

type TextBoxProps = Partial<EditorOptions> &
	InertiaLinkProps & {
		className?: string;
		id?: string;
		value: string;
		onChange?: (value: any) => void;
	};

const TextBox = React.forwardRef<HTMLDivElement, TextBoxProps>(
	({ className, data, href, id, method, value, onChange, ...props }, ref) => {
		const { trans } = useTranslationsStore();

		const sendLabel = trans("Send");

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
					"border-border bg-background ring-offset-background flex grow items-stretch gap-x-3.5 rounded-md border px-3.5 py-2 text-sm",
					{ "border-primary-highlight": isFocused },
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
							asChild={true}
							size='icon'
						>
							<Link
								as='button'
								data={data}
								href={href}
								method={method}
							>
								<Send className='h-6 w-6' />
							</Link>
						</Button>
					</TooltipWrapper>
				</div>
			</div>
		);
	}
);

export default TextBox;

import { Editor } from "@tiptap/react";
import { Quote } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ToggleProps } from "@narsil-ui/Components/Toggle/Toggle";

export interface QuoteToggleProps extends ToggleProps {
	editor: Editor;
}

const QuoteToggle = React.forwardRef<HTMLButtonElement, QuoteToggleProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.quote");

	return (
		<TooltipWrapper tooltip={label}>
			<Toggle
				ref={ref}
				aria-label={label}
				pressed={editor.isActive("blockquote")}
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				{...props}
			>
				<Quote className='h-4 w-4' />
			</Toggle>
		</TooltipWrapper>
	);
});

export default QuoteToggle;

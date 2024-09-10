import { Editor } from "@tiptap/react";
import { List } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ToggleProps } from "@narsil-ui/Components/Toggle/Toggle";

export interface CodeBlockToggleProps extends ToggleProps {
	editor: Editor;
}

const CodeBlockToggle = React.forwardRef<HTMLButtonElement, CodeBlockToggleProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.code_block");

	return (
		<TooltipWrapper tooltip={label}>
			<Toggle
				ref={ref}
				aria-label={label}
				pressed={editor.isActive("codeBlock")}
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				{...props}
			>
				<List className='h-4 w-4' />
			</Toggle>
		</TooltipWrapper>
	);
});

export default CodeBlockToggle;

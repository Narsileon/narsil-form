import { Editor } from "@tiptap/react";
import { Strikethrough } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ToggleProps } from "@narsil-ui/Components/Toggle/Toggle";

export interface StrikeToggleProps extends ToggleProps {
	editor: Editor;
}

const StrikeToggle = React.forwardRef<HTMLButtonElement, StrikeToggleProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.toggle_strike");

	return (
		<TooltipWrapper tooltip={label}>
			<Toggle
				ref={ref}
				aria-label={label}
				pressed={editor.isActive("strike")}
				onClick={() => editor.chain().focus().toggleStrike().run()}
				{...props}
			>
				<Strikethrough className='h-4 w-4' />
			</Toggle>
		</TooltipWrapper>
	);
});

export default StrikeToggle;

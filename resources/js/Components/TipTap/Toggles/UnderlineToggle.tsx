import { Editor } from "@tiptap/react";
import { Underline } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ToggleProps } from "@narsil-ui/Components/Toggle/Toggle";

export interface UnderlineToggleProps extends ToggleProps {
	editor: Editor;
}

const UnderlineToggle = React.forwardRef<HTMLButtonElement, UnderlineToggleProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.toggle_underline");

	return (
		<TooltipWrapper tooltip={label}>
			<Toggle
				ref={ref}
				aria-label={label}
				pressed={editor.isActive("underline")}
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				{...props}
			>
				<Underline className='h-4 w-4' />
			</Toggle>
		</TooltipWrapper>
	);
});

export default UnderlineToggle;

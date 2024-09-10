import { AlignJustify } from "lucide-react";
import { Editor } from "@tiptap/react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ToggleProps } from "@narsil-ui/Components/Toggle/Toggle";

export interface AlignJustifyToggleProps extends ToggleProps {
	editor: Editor;
}

const AlignJustifyToggle = React.forwardRef<HTMLButtonElement, AlignJustifyToggleProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.align_justify");

	return (
		<TooltipWrapper tooltip={label}>
			<Toggle
				ref={ref}
				aria-label={label}
				pressed={editor.isActive({ textAlign: "justify" })}
				onClick={() => editor.chain().focus().setTextAlign("justify").run()}
				{...props}
			>
				<AlignJustify className='h-4 w-4' />
			</Toggle>
		</TooltipWrapper>
	);
});

export default AlignJustifyToggle;

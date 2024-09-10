import { AlignRight } from "lucide-react";
import { Editor } from "@tiptap/react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ToggleProps } from "@narsil-ui/Components/Toggle/Toggle";

export interface AlignRightToggleProps extends ToggleProps {
	editor: Editor;
}

const AlignRightToggle = React.forwardRef<HTMLButtonElement, AlignRightToggleProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.align_right");

	return (
		<TooltipWrapper tooltip={label}>
			<Toggle
				ref={ref}
				aria-label={label}
				pressed={editor.isActive({ textAlign: "right" })}
				onClick={() => editor.chain().focus().setTextAlign("right").run()}
				{...props}
			>
				<AlignRight className='h-4 w-4' />
			</Toggle>
		</TooltipWrapper>
	);
});

export default AlignRightToggle;

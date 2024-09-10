import { AlignCenter } from "lucide-react";
import { Editor } from "@tiptap/react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ToggleProps } from "@narsil-ui/Components/Toggle/Toggle";

export interface AlignCenterToggleProps extends ToggleProps {
	editor: Editor;
}

const AlignCenterToggle = React.forwardRef<HTMLButtonElement, AlignCenterToggleProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.align_center");

	return (
		<TooltipWrapper tooltip={label}>
			<Toggle
				ref={ref}
				aria-label={label}
				pressed={editor.isActive({ textAlign: "center" })}
				onClick={() => editor.chain().focus().setTextAlign("center").run()}
				{...props}
			>
				<AlignCenter className='h-4 w-4' />
			</Toggle>
		</TooltipWrapper>
	);
});

export default AlignCenterToggle;

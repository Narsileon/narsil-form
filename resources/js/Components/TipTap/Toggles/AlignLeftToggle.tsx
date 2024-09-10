import { AlignLeft } from "lucide-react";
import { Editor } from "@tiptap/react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ToggleProps } from "@narsil-ui/Components/Toggle/Toggle";

export interface AlignLeftToggleProps extends ToggleProps {
	editor: Editor;
}

const AlignLeftToggle = React.forwardRef<HTMLButtonElement, AlignLeftToggleProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.align_left");

	return (
		<TooltipWrapper tooltip={label}>
			<Toggle
				ref={ref}
				aria-label={label}
				pressed={editor.isActive({ textAlign: "left" })}
				onClick={() => editor.chain().focus().setTextAlign("left").run()}
				{...props}
			>
				<AlignLeft className='h-4 w-4' />
			</Toggle>
		</TooltipWrapper>
	);
});

export default AlignLeftToggle;

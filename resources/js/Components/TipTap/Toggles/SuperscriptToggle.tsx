import { Editor } from "@tiptap/react";
import { Superscript } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ToggleProps } from "@narsil-ui/Components/Toggle/Toggle";

export interface SuperscriptToggleProps extends ToggleProps {
	editor: Editor;
}

const SuperscriptToggle = React.forwardRef<HTMLButtonElement, SuperscriptToggleProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.superscript");

	return (
		<TooltipWrapper tooltip={label}>
			<Toggle
				ref={ref}
				aria-label={label}
				pressed={editor.isActive("superscript")}
				onClick={() => {
					editor.chain().focus().unsetSubscript().run();
					editor.chain().focus().toggleSuperscript().run();
				}}
				{...props}
			>
				<Superscript className='h-4 w-4' />
			</Toggle>
		</TooltipWrapper>
	);
});

export default SuperscriptToggle;

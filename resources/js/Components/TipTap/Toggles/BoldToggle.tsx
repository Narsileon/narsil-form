import { Bold } from "lucide-react";
import { Editor } from "@tiptap/react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ToggleProps } from "@narsil-ui/Components/Toggle/Toggle";

export interface BoldToggleProps extends ToggleProps {
	editor: Editor;
}

const BoldToggle = React.forwardRef<HTMLButtonElement, BoldToggleProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.bold");

	return (
		<TooltipWrapper tooltip={label}>
			<Toggle
				ref={ref}
				aria-label={label}
				pressed={editor.isActive("bold")}
				onClick={() => editor.chain().focus().toggleBold().run()}
				{...props}
			>
				<Bold className='h-4 w-4' />
			</Toggle>
		</TooltipWrapper>
	);
});

export default BoldToggle;

import { Editor } from "@tiptap/react";
import { Subscript } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ToggleProps } from "@narsil-ui/Components/Toggle/Toggle";

export interface SubscriptToggleProps extends ToggleProps {
	editor: Editor;
}

const SubscriptToggle = React.forwardRef<HTMLButtonElement, SubscriptToggleProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.subscript");

	return (
		<TooltipWrapper tooltip={label}>
			<Toggle
				ref={ref}
				aria-label={label}
				pressed={editor.isActive("subscript")}
				onClick={() => {
					editor.chain().focus().unsetSuperscript().run();
					editor.chain().focus().toggleSubscript().run();
				}}
				{...props}
			>
				<Subscript className='h-4 w-4' />
			</Toggle>
		</TooltipWrapper>
	);
});

export default SubscriptToggle;

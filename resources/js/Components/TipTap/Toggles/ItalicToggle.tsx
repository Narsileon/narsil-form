import { Editor } from "@tiptap/react";
import { Italic } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ToggleProps } from "@narsil-ui/Components/Toggle/Toggle";

export interface ItalicToggleProps extends ToggleProps {
	editor: Editor;
}

const ItalicToggle = React.forwardRef<HTMLButtonElement, ItalicToggleProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.toggle_italic");

	return (
		<TooltipWrapper tooltip={label}>
			<Toggle
				ref={ref}
				aria-label={label}
				pressed={editor.isActive("italic")}
				onClick={() => editor.chain().focus().toggleItalic().run()}
				{...props}
			>
				<Italic className='h-4 w-4' />
			</Toggle>
		</TooltipWrapper>
	);
});

export default ItalicToggle;

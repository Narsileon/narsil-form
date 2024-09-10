import { Editor } from "@tiptap/react";
import { Undo } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ButtonProps } from "@narsil-ui/Components/Button/Button";

export interface UndoButtonProps extends ButtonProps {
	editor: Editor;
}

const UndoButton = React.forwardRef<HTMLButtonElement, UndoButtonProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.undo");

	return (
		<TooltipWrapper tooltip={label}>
			<Button
				ref={ref}
				aria-label={label}
				disabled={!editor.can().chain().focus().undo().run()}
				size='icon'
				type='button'
				variant='ghost'
				onClick={() => editor.chain().focus().undo().run()}
				{...props}
			>
				<Undo className='h-4 w-4' />
			</Button>
		</TooltipWrapper>
	);
});

export default UndoButton;

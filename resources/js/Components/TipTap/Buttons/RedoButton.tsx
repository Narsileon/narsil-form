import { Editor } from "@tiptap/react";
import { Redo } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ButtonProps } from "@narsil-ui/Components/Button/Button";

export interface RedoButtonProps extends ButtonProps {
	editor: Editor;
}

const RedoButton = React.forwardRef<HTMLButtonElement, RedoButtonProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.redo");

	return (
		<TooltipWrapper tooltip={label}>
			<Button
				ref={ref}
				aria-label={label}
				disabled={!editor.can().chain().focus().redo().run()}
				size='icon'
				type='button'
				variant='ghost'
				onClick={() => editor.chain().focus().redo().run()}
				{...props}
			>
				<Redo className='h-4 w-4' />
			</Button>
		</TooltipWrapper>
	);
});

export default RedoButton;

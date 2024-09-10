import { Editor } from "@tiptap/react";
import { List } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ToggleProps } from "@narsil-ui/Components/Toggle/Toggle";

export interface BulletListToggleProps extends ToggleProps {
	editor: Editor;
}

const BulletListToggle = React.forwardRef<HTMLButtonElement, BulletListToggleProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.bullet_list");

	return (
		<TooltipWrapper tooltip={label}>
			<Toggle
				ref={ref}
				aria-label={label}
				pressed={editor.isActive("bulletList")}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				{...props}
			>
				<List className='h-4 w-4' />
			</Toggle>
		</TooltipWrapper>
	);
});

export default BulletListToggle;

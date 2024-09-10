import { Editor } from "@tiptap/react";
import { ListOrdered } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ToggleProps } from "@narsil-ui/Components/Toggle/Toggle";

export interface OrderedListToggleProps extends ToggleProps {
	editor: Editor;
}

const OrderedListToggle = React.forwardRef<HTMLButtonElement, OrderedListToggleProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const label = trans("editor.ordered_list");

	return (
		<TooltipWrapper tooltip={label}>
			<Toggle
				ref={ref}
				aria-label={label}
				pressed={editor.isActive("orderedList")}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				{...props}
			>
				<ListOrdered className='h-4 w-4' />
			</Toggle>
		</TooltipWrapper>
	);
});

export default OrderedListToggle;

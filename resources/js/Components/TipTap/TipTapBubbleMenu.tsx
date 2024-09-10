import { BubbleMenu, Editor } from "@tiptap/react";
import Separator from "@narsil-ui/Components/Separator/Separator";
import BoldToggle from "./Toggles/BoldToggle";
import ItalicToggle from "./Toggles/ItalicToggle";
import UnderlineToggle from "./Toggles/UnderlineToggle";
import StrikeToggle from "./Toggles/StrikeToggle";
import ColorPopover from "./Popovers/ColorPopover";
import HighlightPopover from "./Popovers/HighlightPopover";

export interface TipTapBubbleMenuProps {
	editor: Editor | null;
}

const TipTapBubbleMenu = ({ editor }: TipTapBubbleMenuProps) => {
	if (!editor) {
		return null;
	}

	return (
		<BubbleMenu
			editor={editor}
			className='text-card-popover bg-popover flex gap-x-1 rounded-md border p-1 shadow-md'
		>
			<BoldToggle editor={editor} />
			<ItalicToggle editor={editor} />
			<UnderlineToggle editor={editor} />
			<StrikeToggle editor={editor} />

			<Separator
				className='mx-1 h-9'
				orientation='vertical'
			/>

			<ColorPopover editor={editor} />
			<HighlightPopover editor={editor} />
		</BubbleMenu>
	);
};

export default TipTapBubbleMenu;

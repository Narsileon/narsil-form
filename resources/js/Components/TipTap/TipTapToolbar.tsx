import { cn } from "@narsil-ui/Components";
import { Editor } from "@tiptap/react";
import * as React from "react";
import AlignCenterToggle from "./Toggles/AlignCenterToggle";
import AlignJustifyToggle from "./Toggles/AllignJustifyToggle";
import AlignLeftToggle from "./Toggles/AlignLeftToggle";
import AlignRightToggle from "./Toggles/AlignRightToggle";
import BoldToggle from "./Toggles/BoldToggle";
import BulletListToggle from "./Toggles/BulletListToggle";
import CodeBlockToggle from "./Toggles/CodeBlockToggle";
import ColorPopover from "./Popovers/ColorPopover";
import HeadingDropdown from "./Dropdowns/HeadingDropdown";
import HighlightPopover from "./Popovers/HighlightPopover";
import ItalicToggle from "./Toggles/ItalicToggle";
import OrderedListToggle from "./Toggles/OrderedListToggle";
import QuoteToggle from "./Toggles/QuoteToggle";
import RedoButton from "./Buttons/RedoButton";
import Separator from "@narsil-ui/Components/Separator/Separator";
import StrikeToggle from "./Toggles/StrikeToggle";
import SubscriptToggle from "./Toggles/SubscriptToggle";
import SuperscriptToggle from "./Toggles/SuperscriptToggle";
import UnderlineToggle from "./Toggles/UnderlineToggle";
import UndoButton from "./Buttons/UndoButton";

export interface TipTapToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
	editor: Editor | null;
}

const TipTapToolbar = React.forwardRef<HTMLDivElement, TipTapToolbarProps>(({ className, editor, ...props }, ref) => {
	if (!editor) {
		return null;
	}

	return (
		<div
			ref={ref}
			className={cn("flex flex-wrap items-center", className)}
			{...props}
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

			<Separator
				className='mx-1 h-9'
				orientation='vertical'
			/>

			<HeadingDropdown editor={editor} />
			<SuperscriptToggle editor={editor} />
			<SubscriptToggle editor={editor} />

			<Separator
				className='mx-1 h-9'
				orientation='vertical'
			/>

			<AlignLeftToggle editor={editor} />
			<AlignCenterToggle editor={editor} />
			<AlignRightToggle editor={editor} />
			<AlignJustifyToggle editor={editor} />

			<Separator
				className='mx-1 h-9'
				orientation='vertical'
			/>

			<BulletListToggle editor={editor} />
			<OrderedListToggle editor={editor} />

			<Separator
				className='mx-1 h-9'
				orientation='vertical'
			/>

			<QuoteToggle editor={editor} />
			<CodeBlockToggle editor={editor} />

			<Separator
				className='mx-1 h-9'
				orientation='vertical'
			/>

			<UndoButton editor={editor} />
			<RedoButton editor={editor} />
		</div>
	);
});

export default TipTapToolbar;

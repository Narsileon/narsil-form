import { Baseline, Bold, Italic, PencilLine, Strikethrough, Underline } from "lucide-react";
import { BubbleMenu, Editor } from "@tiptap/react";
import { tipTapColors } from "./tipTapUtils";
import Button from "@narsil-ui/Components/Button/Button";
import Popover from "@narsil-ui/Components/Popover/Popover";
import PopoverContent from "@narsil-ui/Components/Popover/PopoverContent";
import PopoverTrigger from "@narsil-ui/Components/Popover/PopoverTrigger";
import Separator from "@narsil-ui/Components/Separator/Separator";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";

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
			<Toggle
				aria-label='Toggle bold'
				pressed={editor.isActive("bold")}
				onClick={() => editor.chain().focus().toggleBold().run()}
			>
				<Bold className='h-4 w-4' />
			</Toggle>

			<Toggle
				aria-label='Toggle italic'
				pressed={editor.isActive("italic")}
				onClick={() => editor.chain().focus().toggleItalic().run()}
			>
				<Italic className='h-4 w-4' />
			</Toggle>

			<Toggle
				aria-label='Toggle underline'
				pressed={editor.isActive("underline")}
				onClick={() => editor.chain().focus().toggleUnderline().run()}
			>
				<Underline className='h-4 w-4' />
			</Toggle>

			<Toggle
				aria-label='Toggle strike'
				pressed={editor.isActive("strike")}
				onClick={() => editor.chain().focus().toggleStrike().run()}
			>
				<Strikethrough className='h-4 w-4' />
			</Toggle>

			<Separator
				className='mx-1 h-9'
				orientation='vertical'
			/>

			<Popover>
				<PopoverTrigger asChild={true}>
					<Button
						className='w-8 min-w-8'
						size='icon'
						variant='ghost'
					>
						<Baseline
							className='h-4 w-4'
							color={editor.getAttributes("textStyle").color}
						/>
					</Button>
				</PopoverTrigger>

				<PopoverContent className='grid w-fit grid-cols-4'>
					{tipTapColors.map((color) => {
						return (
							<Button
								size='icon'
								variant='ghost'
								onClick={() => editor.chain().focus().setColor(color).run()}
								key={color}
							>
								<div
									className='h-6 w-6 rounded'
									style={{ backgroundColor: color }}
								/>
							</Button>
						);
					})}
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger asChild={true}>
					<Button
						className='w-8 min-w-8'
						size='icon'
						variant='ghost'
					>
						<PencilLine
							className='h-4 w-4'
							color={editor.getAttributes("textStyle").highlight}
						/>
					</Button>
				</PopoverTrigger>

				<PopoverContent className='grid w-fit grid-cols-4'>
					{tipTapColors.map((color) => {
						return (
							<Button
								size='icon'
								variant='ghost'
								onClick={() => editor.chain().focus().setHighlight({ color: color }).run()}
								key={color}
							>
								<div
									className='h-6 w-6 rounded'
									style={{ backgroundColor: color }}
								/>
							</Button>
						);
					})}
				</PopoverContent>
			</Popover>
		</BubbleMenu>
	);
};

export default TipTapBubbleMenu;

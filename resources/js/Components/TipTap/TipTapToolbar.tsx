import { Editor } from "@tiptap/react";
import { tipTapColors } from "./tipTapUtils";
import Button from "@narsil-ui/Components/Button/Button";
import DropdownMenu from "@narsil-ui/Components/DropdownMenu/DropdownMenu";
import DropdownMenuContent from "@narsil-ui/Components/DropdownMenu/DropdownMenuContent";
import DropdownMenuItem from "@narsil-ui/Components/DropdownMenu/DropdownMenuItem";
import DropdownMenuTrigger from "@narsil-ui/Components/DropdownMenu/DropdownMenuTrigger";
import Popover from "@narsil-ui/Components/Popover/Popover";
import PopoverContent from "@narsil-ui/Components/Popover/PopoverContent";
import PopoverTrigger from "@narsil-ui/Components/Popover/PopoverTrigger";
import Separator from "@narsil-ui/Components/Separator/Separator";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";

import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Baseline,
	Bold,
	Code,
	Heading,
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
	Heading6,
	Italic,
	List,
	ListOrdered,
	PencilLine,
	Quote,
	Redo,
	Strikethrough,
	Subscript,
	Superscript,
	Underline,
	Undo,
} from "lucide-react";

export interface TipTapToolbarProps {
	editor: Editor | null;
}

const TipTapToolbar = ({ editor }: TipTapToolbarProps) => {
	if (!editor) {
		return null;
	}

	return (
		<div className='flex flex-wrap items-center'>
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
						size='icon'
						variant='ghost'
					>
						<Baseline
							className='h-4 w-4'
							color={editor.getAttributes("textStyle").color}
						/>
					</Button>
				</PopoverTrigger>

				<PopoverContent className='grid grid-cols-4'>
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
						size='icon'
						variant='ghost'
					>
						<PencilLine
							className='h-4 w-4'
							color={editor.getAttributes("textStyle").highlight}
						/>
					</Button>
				</PopoverTrigger>

				<PopoverContent className='grid grid-cols-4'>
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

			<Separator
				className='mx-1 h-9'
				orientation='vertical'
			/>

			<DropdownMenu>
				<DropdownMenuTrigger asChild={true}>
					<Button
						size='icon'
						variant='ghost'
					>
						<Heading className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem asChild={true}>
						<Toggle
							aria-label='Toggle heading 1'
							pressed={editor.isActive("heading", { level: 1 })}
							onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
						>
							<Heading1 className='h-4 w-4' />
						</Toggle>
					</DropdownMenuItem>
					<DropdownMenuItem asChild={true}>
						<Toggle
							aria-label='Toggle heading 2'
							pressed={editor.isActive("heading", { level: 2 })}
							onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
						>
							<Heading2 className='h-4 w-4' />
						</Toggle>
					</DropdownMenuItem>
					<DropdownMenuItem asChild={true}>
						<Toggle
							aria-label='Toggle heading 3'
							pressed={editor.isActive("heading", { level: 3 })}
							onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
						>
							<Heading3 className='h-4 w-4' />
						</Toggle>
					</DropdownMenuItem>
					<DropdownMenuItem asChild={true}>
						<Toggle
							aria-label='Toggle heading 4'
							pressed={editor.isActive("heading", { level: 4 })}
							onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
						>
							<Heading4 className='h-4 w-4' />
						</Toggle>
					</DropdownMenuItem>
					<DropdownMenuItem asChild={true}>
						<Toggle
							aria-label='Toggle heading 5'
							pressed={editor.isActive("heading", { level: 5 })}
							onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
						>
							<Heading5 className='h-4 w-4' />
						</Toggle>
					</DropdownMenuItem>
					<DropdownMenuItem asChild={true}>
						<Toggle
							aria-label='Toggle heading 6'
							pressed={editor.isActive("heading", { level: 6 })}
							onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
						>
							<Heading6 className='h-4 w-4' />
						</Toggle>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Toggle
				aria-label='Toggle superscript'
				pressed={editor.isActive("superscript")}
				onClick={() => {
					editor.chain().focus().unsetSubscript().run();
					editor.chain().focus().toggleSuperscript().run();
				}}
			>
				<Superscript className='h-4 w-4' />
			</Toggle>

			<Toggle
				aria-label='Toggle subscript'
				pressed={editor.isActive("subscript")}
				onClick={() => {
					editor.chain().focus().unsetSuperscript().run();
					editor.chain().focus().toggleSubscript().run();
				}}
			>
				<Subscript className='h-4 w-4' />
			</Toggle>

			<Separator
				className='mx-1 h-9'
				orientation='vertical'
			/>

			<Toggle
				aria-label='Toggle align left'
				pressed={editor.isActive({ textAlign: "left" })}
				onClick={() => editor.chain().focus().setTextAlign("left").run()}
			>
				<AlignLeft className='h-4 w-4' />
			</Toggle>

			<Toggle
				aria-label='Toggle align center'
				pressed={editor.isActive({ textAlign: "center" })}
				onClick={() => editor.chain().focus().setTextAlign("center").run()}
			>
				<AlignCenter className='h-4 w-4' />
			</Toggle>

			<Toggle
				aria-label='Toggle align right'
				pressed={editor.isActive({ textAlign: "right" })}
				onClick={() => editor.chain().focus().setTextAlign("right").run()}
			>
				<AlignRight className='h-4 w-4' />
			</Toggle>

			<Toggle
				aria-label='Toggle align justify'
				pressed={editor.isActive({ textAlign: "justify" })}
				onClick={() => editor.chain().focus().setTextAlign("justify").run()}
			>
				<AlignJustify className='h-4 w-4' />
			</Toggle>

			<Separator
				className='mx-1 h-9'
				orientation='vertical'
			/>

			<Toggle
				aria-label='Toggle list'
				pressed={editor.isActive("bulletList")}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
			>
				<List className='h-4 w-4' />
			</Toggle>

			<Toggle
				aria-label='Toggle ordered list'
				pressed={editor.isActive("orderedList")}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<ListOrdered className='h-4 w-4' />
			</Toggle>

			<Separator
				className='mx-1 h-9'
				orientation='vertical'
			/>

			<Toggle
				aria-label='Toggle quote'
				pressed={editor.isActive("blockquote")}
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
			>
				<Quote className='h-4 w-4' />
			</Toggle>

			<Toggle
				aria-label='Toggle code'
				pressed={editor.isActive("codeBlock")}
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
			>
				<Code className='h-4 w-4' />
			</Toggle>

			<Separator
				className='mx-1 h-9'
				orientation='vertical'
			/>

			<Button
				aria-label='Undo'
				size='icon'
				variant='ghost'
				disabled={!editor.can().chain().focus().undo().run()}
				onClick={() => editor.chain().focus().undo().run()}
			>
				<Undo className='h-4 w-4' />
			</Button>

			<Button
				aria-label='Redo'
				size='icon'
				variant='ghost'
				disabled={!editor.can().chain().focus().redo().run()}
				onClick={() => editor.chain().focus().redo().run()}
			>
				<Redo className='h-4 w-4' />
			</Button>
		</div>
	);
};

export default TipTapToolbar;

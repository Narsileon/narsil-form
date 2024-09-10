import { Editor } from "@tiptap/react";
import { Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import DropdownMenu from "@narsil-ui/Components/DropdownMenu/DropdownMenu";
import DropdownMenuContent from "@narsil-ui/Components/DropdownMenu/DropdownMenuContent";
import DropdownMenuItem from "@narsil-ui/Components/DropdownMenu/DropdownMenuItem";
import DropdownMenuTrigger from "@narsil-ui/Components/DropdownMenu/DropdownMenuTrigger";
import Toggle from "@narsil-ui/Components/Toggle/Toggle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { DropdownMenuTriggerProps } from "@narsil-ui/Components/DropdownMenu/DropdownMenuTrigger";

export interface HeadingDropdownProps extends DropdownMenuTriggerProps {
	editor: Editor;
}

const HeadingDropdown = React.forwardRef<HTMLButtonElement, HeadingDropdownProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const headingLabel = trans("editor.heading");
	const heading1Label = trans("editor.heading_1");
	const heading2Label = trans("editor.heading_2");
	const heading3Label = trans("editor.heading_3");
	const heading4Label = trans("editor.heading_4");
	const heading5Label = trans("editor.heading_5");
	const heading6Label = trans("editor.heading_6");

	return (
		<DropdownMenu>
			<TooltipWrapper tooltip={headingLabel}>
				<DropdownMenuTrigger
					ref={ref}
					asChild={true}
				>
					<Button
						className='w-8 min-w-8'
						aria-label={headingLabel}
						size='icon'
						variant='ghost'
						{...props}
					>
						<Heading className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
			</TooltipWrapper>
			<DropdownMenuContent>
				<DropdownMenuItem asChild={true}>
					<TooltipWrapper tooltip={heading1Label}>
						<Toggle
							aria-label='Toggle heading 1'
							pressed={editor.isActive("heading", { level: 1 })}
							onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
						>
							<Heading1 className='h-4 w-4' />
						</Toggle>
					</TooltipWrapper>
				</DropdownMenuItem>
				<DropdownMenuItem asChild={true}>
					<TooltipWrapper tooltip={heading2Label}>
						<Toggle
							aria-label={heading2Label}
							pressed={editor.isActive("heading", { level: 2 })}
							onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
						>
							<Heading2 className='h-4 w-4' />
						</Toggle>
					</TooltipWrapper>
				</DropdownMenuItem>
				<DropdownMenuItem asChild={true}>
					<TooltipWrapper tooltip={heading3Label}>
						<Toggle
							aria-label={heading3Label}
							pressed={editor.isActive("heading", { level: 3 })}
							onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
						>
							<Heading3 className='h-4 w-4' />
						</Toggle>
					</TooltipWrapper>
				</DropdownMenuItem>
				<DropdownMenuItem asChild={true}>
					<TooltipWrapper tooltip={heading4Label}>
						<Toggle
							aria-label={heading4Label}
							pressed={editor.isActive("heading", { level: 4 })}
							onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
						>
							<Heading4 className='h-4 w-4' />
						</Toggle>
					</TooltipWrapper>
				</DropdownMenuItem>
				<DropdownMenuItem asChild={true}>
					<TooltipWrapper tooltip={heading5Label}>
						<Toggle
							aria-label={heading5Label}
							pressed={editor.isActive("heading", { level: 5 })}
							onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
						>
							<Heading5 className='h-4 w-4' />
						</Toggle>
					</TooltipWrapper>
				</DropdownMenuItem>
				<DropdownMenuItem asChild={true}>
					<TooltipWrapper tooltip={heading6Label}>
						<Toggle
							aria-label={heading6Label}
							pressed={editor.isActive("heading", { level: 6 })}
							onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
						>
							<Heading6 className='h-4 w-4' />
						</Toggle>
					</TooltipWrapper>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
});

export default HeadingDropdown;

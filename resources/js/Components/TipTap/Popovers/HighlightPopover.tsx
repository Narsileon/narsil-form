import { Editor } from "@tiptap/react";
import { inputColors } from "@narsil-ui/Components/Input/Color/colorUtils";
import { PencilLine } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import Popover from "@narsil-ui/Components/Popover/Popover";
import PopoverContent from "@narsil-ui/Components/Popover/PopoverContent";
import PopoverTrigger from "@narsil-ui/Components/Popover/PopoverTrigger";
import Separator from "@narsil-ui/Components/Separator/Separator";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { PopoverTriggerProps } from "@narsil-ui/Components/Popover/PopoverTrigger";

export interface HighlightPopoverProps extends PopoverTriggerProps {
	editor: Editor;
}

const HighlightPopover = React.forwardRef<HTMLButtonElement, HighlightPopoverProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const highlightLabel = trans("editor.highlight");

	return (
		<Popover>
			<TooltipWrapper tooltip={highlightLabel}>
				<PopoverTrigger
					ref={ref}
					asChild={true}
					{...props}
				>
					<Button
						className='w-8 min-w-8'
						aria-label={highlightLabel}
						size='icon'
						variant='ghost'
					>
						<PencilLine
							className='h-4 w-4'
							color={editor.getAttributes("textStyle").highlight}
						/>
					</Button>
				</PopoverTrigger>
			</TooltipWrapper>

			<PopoverContent className='w-fit space-y-2 p-2'>
				<div className='grid w-fit grid-cols-4'>
					{Object.entries(inputColors).map(([colorName, colorValue]) => {
						const colorLabel = trans(`colors.${colorName}`);

						return (
							<TooltipWrapper
								tooltip={colorLabel}
								key={colorName}
							>
								<Button
									aria-label={colorLabel}
									size='icon'
									variant='ghost'
									onClick={() => editor.chain().focus().setHighlight({ color: colorValue }).run()}
								>
									<div
										className='h-6 w-6 rounded'
										style={{ backgroundColor: colorValue }}
									/>
								</Button>
							</TooltipWrapper>
						);
					})}
				</div>
				<Separator />
				<Button
					className='w-full'
					onClick={() => editor.commands.unsetHighlight()}
				>
					{trans("Clear")}
				</Button>
			</PopoverContent>
		</Popover>
	);
});

export default HighlightPopover;

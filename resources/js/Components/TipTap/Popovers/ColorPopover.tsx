import { Baseline } from "lucide-react";
import { Editor } from "@tiptap/react";
import { inputColors } from "@narsil-ui/Components/Input/Color/colorUtils";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import Popover from "@narsil-ui/Components/Popover/Popover";
import PopoverContent from "@narsil-ui/Components/Popover/PopoverContent";
import PopoverTrigger from "@narsil-ui/Components/Popover/PopoverTrigger";
import Separator from "@narsil-ui/Components/Separator/Separator";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { PopoverTriggerProps } from "@narsil-ui/Components/Popover/PopoverTrigger";

export interface ColorPopoverProps extends PopoverTriggerProps {
	editor: Editor;
}

const ColorPopover = React.forwardRef<HTMLButtonElement, ColorPopoverProps>(({ editor, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const textColorLabel = trans("editor.text_color");

	if (!editor) {
		return null;
	}

	return (
		<Popover>
			<TooltipWrapper tooltip={textColorLabel}>
				<PopoverTrigger
					ref={ref}
					asChild={true}
					{...props}
				>
					<Button
						className='w-8 min-w-8'
						aria-label={textColorLabel}
						size='icon'
						variant='ghost'
					>
						<Baseline
							className='h-4 w-4'
							color={editor.getAttributes("textStyle").color}
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
									onClick={() => editor.chain().focus().setColor(colorValue).run()}
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
					onClick={() => editor.chain().focus().unsetColor()}
				>
					{trans("Clear")}
				</Button>
			</PopoverContent>
		</Popover>
	);
});

export default ColorPopover;

import { useFormContext } from "react-hook-form";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as React from "react";
import AsyncCombobox from "@narsil-ui/Components/Combobox/AsyncCombobox";
import Card from "@narsil-ui/Components/Card/Card";
import CardContent from "@narsil-ui/Components/Card/CardContent";
import CardFooter from "@narsil-ui/Components/Card/CardFooter";
import CardHeader from "@narsil-ui/Components/Card/CardHeader";
import CardTitle from "@narsil-ui/Components/Card/CardTitle";
import Combobox from "@narsil-ui/Components/Combobox/Combobox";
import FormControl from "./FormControl";
import FormDescription from "./FormDescription";
import FormField from "./FormField";
import FormItem from "./FormItem";
import FormLabel from "./FormLabel";
import FormMessage from "./FormMessage";
import Input from "@narsil-ui/Components/Input/Input";
import RichTextEditor from "@narsil-forms/Components/RichTextEditor/RichTextEditor";
import Section from "@narsil-ui/Components/Section/Section";
import SectionContent from "@narsil-ui/Components/Section/SectionContent";
import SectionFooter from "@narsil-ui/Components/Section/SectionFooter";
import SectionHeader from "@narsil-ui/Components/Section/SectionHeader";
import SectionTitle from "@narsil-ui/Components/Section/SectionTitle";
import Switch from "@narsil-ui/Components/Switch/Switch";
import SectionFullscreenToggle from "@narsil-ui/Components/Section/SectionFullscreenToggle";

export interface FormRendererProps {
	footer?: React.ReactNode;
	nodes: FormNodeModel[];
	options?: any;
	parentNode?: FormNodeModel;
}

const FormRenderer = ({ footer, nodes, options, parentNode }: FormRendererProps) => {
	const { trans } = useTranslationsStore();

	const { control } = useFormContext();

	return nodes
		.filter((x) => x.parent_id === (parentNode ? parentNode.id : null))
		.map((node, index) => {
			if (node.identifier === "active") {
				return null;
			}

			return (
				<FormField
					control={control}
					name={node.identifier}
					render={({ field }) => {
						switch (node.node_type) {
							case "card":
								return (
									<Card>
										{node.label ? (
											<CardHeader>
												<CardTitle>{node.label}</CardTitle>
											</CardHeader>
										) : null}
										<CardContent>
											<FormRenderer
												footer={footer}
												nodes={nodes}
												options={options}
												parentNode={node}
											/>
										</CardContent>
										<CardFooter>{footer}</CardFooter>
									</Card>
								);
							case "editor":
								return (
									<FormItem>
										<div className='flex items-center justify-between'>
											<FormLabel htmlFor={node.identifier}>{node.label}</FormLabel>
										</div>
										<FormControl>
											<RichTextEditor {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							case "section":
								return (
									<Section>
										{node.label ? (
											<SectionHeader>
												<SectionTitle>{node.label}</SectionTitle>
                                                <SectionFullscreenToggle />
											</SectionHeader>
										) : null}
										<SectionContent>
											<FormRenderer
												footer={footer}
												nodes={nodes}
												options={options}
												parentNode={node}
											/>
										</SectionContent>
										<SectionFooter>{footer}</SectionFooter>
									</Section>
								);
							case "select":
								const optionsProps = options[node.identifier] ?? {};

								return (
									<FormItem>
										<div className='flex items-center justify-between'>
											<FormLabel htmlFor={node.identifier}>{node.label}</FormLabel>
										</div>
										<FormControl>
											{node.parameters?.fetch ? (
												<AsyncCombobox
													{...field}
													fetch={node.parameters.fetch}
													labelKey={node.parameters.label_key}
													valueKey={node.parameters.value_key}
													preview={node.parameters.preview}
												/>
											) : (
												<Combobox
													{...field}
													options={optionsProps.options}
													labelKey={node.parameters?.label_key}
													valueKey={node.parameters?.value_key}
												/>
											)}
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							case "switch":
								return (
									<FormItem orientation='horizontal'>
										<FormLabel htmlFor={node.identifier}>{node.label + trans(":")}</FormLabel>

										<FormControl>
											<Switch {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);

							default:
								return (
									<FormItem>
										<div className='flex items-center justify-between'>
											<FormLabel htmlFor={node.identifier}>{node.label}</FormLabel>
										</div>
										<FormControl>
											<Input
												{...field}
												type={node.type ?? "text"}
											/>
										</FormControl>
										{node.description ? (
											<FormDescription>{node.description}</FormDescription>
										) : null}

										<FormMessage />
									</FormItem>
								);
						}
					}}
					key={index}
				/>
			);
		});
};

export default FormRenderer;

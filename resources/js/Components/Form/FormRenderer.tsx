import { FormNodeModel } from "@narsil-forms/Types";
import { useFormContext } from "react-hook-form";
import { useLanguageContext } from "@narsil-localization/Components/Language/LanguageProvider";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
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
import Fullscreen from "@narsil-ui/Components/Fullscreen/Fullscreen";
import FullscreenToggle from "@narsil-ui/Components/Fullscreen/FullscreenToggle";
import Input from "@narsil-ui/Components/Input/Input";
import RichTextEditor from "@narsil-forms/Components/RichTextEditor/RichTextEditor";
import Section from "@narsil-ui/Components/Section/Section";
import SectionContent from "@narsil-ui/Components/Section/SectionContent";
import SectionFooter from "@narsil-ui/Components/Section/SectionFooter";
import SectionHeader from "@narsil-ui/Components/Section/SectionHeader";
import SectionTitle from "@narsil-ui/Components/Section/SectionTitle";
import Switch from "@narsil-ui/Components/Switch/Switch";

export interface FormRendererProps {
	footer?: React.ReactNode;
	nodes: FormNodeModel[];
	options?: any;
	parentNode?: FormNodeModel;
}

const FormRenderer = ({ footer, nodes, options, parentNode }: FormRendererProps) => {
	const { trans } = useTranslationsStore();

	const { control } = useFormContext();
	const { contextLanguage } = useLanguageContext();

	return nodes
		.filter((x) => x.parent_id === (parentNode ? parentNode.id : null))
		.map((node) => {
			if (node.identifier === "active") {
				return null;
			}

			const id = node.node_type === "trans" ? `${node.identifier}.values.${contextLanguage.id}` : node.identifier;

			return (
				<FormField
					control={control}
					name={id}
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
										<FormLabel
											htmlFor={id}
											required={node.required}
										>
											{node.label}
										</FormLabel>
										<FormControl>
											<RichTextEditor
												{...field}
												id={id}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							case "section":
								return (
									<Fullscreen>
										<Section>
											{node.label ? (
												<SectionHeader>
													<SectionTitle>{node.label}</SectionTitle>
													<FullscreenToggle />
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
									</Fullscreen>
								);
							case "select":
								const optionsProps = options[id] ?? {};

								return (
									<FormItem>
										<FormLabel
											htmlFor={id}
											required={node.required}
										>
											{node.label}
										</FormLabel>
										<FormControl>
											{node.parameters?.fetch ? (
												<AsyncCombobox
													{...field}
													id={id}
													fetch={node.parameters.fetch}
													labelKey={node.parameters.label_key}
													preview={node.parameters.preview}
													valueKey={node.parameters.value_key}
												/>
											) : (
												<Combobox
													{...field}
													id={id}
													labelKey={node.parameters?.label_key}
													options={optionsProps.options}
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
										<FormLabel
											htmlFor={id}
											required={node.required}
										>
											{node.label + trans(":")}
										</FormLabel>

										<FormControl>
											<Switch
												{...field}
												id={id}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							case "trans":
								return (
									<FormItem>
										<div className='flex items-center gap-x-2'>
											<FormLabel
												htmlFor={id}
												required={node.required}
											>
												{node.label}
											</FormLabel>
										</div>
										<FormControl>
											<Input
												{...field}
												id={id}
												autoComplete={node.auto_complete}
												type={node.type ?? "text"}
											/>
										</FormControl>
										{node.description ? (
											<FormDescription>{node.description}</FormDescription>
										) : null}

										<FormMessage />
									</FormItem>
								);
							default:
								return (
									<FormItem>
										<FormLabel
											htmlFor={id}
											required={node.required}
										>
											{node.label}
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												id={id}
												autoComplete={node.auto_complete}
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
					key={id}
				/>
			);
		});
};

export default FormRenderer;

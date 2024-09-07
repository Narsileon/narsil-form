import { FormModel, FormNodeModel } from "@narsil-forms/Types";
import { LanguageModel } from "@narsil-localization/Types";
import { transSchema } from "./formSchemas";
import { useForm as useReactForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function getRequiredFields(schema: z.ZodObject<any>) {
	const requiredFields = [];

	const schemaShape = schema._def.shape();

	for (const key in schemaShape) {
		const field = schemaShape[key];

		if (field.isOptional() === false && field.isNullable() === false) {
			requiredFields.push(key);
		}
	}

	return requiredFields;
}

export interface useFormProps {
	data?: Record<string, any>;
	form: FormModel;
	languages?: LanguageModel[];
}

function generateFormSchema(nodes: FormNodeModel[], languages: LanguageModel[]) {
	const schemaObject: Record<string, z.Schema> = {};

	nodes.map((node) => {
		let schema: z.ZodTypeAny;

		switch (node.node_type) {
			case "editor":
				schema = z.string();
				break;
			case "number":
				schema = z.number();
				break;
			case "select":
				schema = z.any();
				break;
			case "string":
				schema = z.string();
				break;
			case "switch":
				schema = z.boolean();
				break;
			case "trans":
				schema = transSchema(languages);
				break;
			default:
				return;
		}

		if (schema instanceof z.ZodString) {
			if (node.min) {
				schema = schema.min(Number(node.min));
			} else if (node.required) {
				schema = schema.min(1);
			}
		}
		if (node.max && schema instanceof z.ZodString) {
			schema = schema.max(Number(node.max));
		}
		if (node.min && schema instanceof z.ZodNumber) {
			schema = schema.min(Number(node.min));
		}
		if (node.max && schema instanceof z.ZodNumber) {
			schema = schema.max(Number(node.max));
		}
		if (node.required === false) {
			schema = schema.optional();
		}

		switch (node.node_type) {
			case "switch":
				schema = schema.default(false);
				break;
			default:
				schema = schema.default("");
				break;
		}

		schemaObject[node.identifier] = schema;
	});

	return z.object(schemaObject);
}

const useForm = ({ data = {}, form, languages = [] }: useFormProps) => {
	let schema = generateFormSchema(form.nodes ?? [], languages);

	const defaultValues = (() => {
		return Object.fromEntries(
			Object.entries(schema.shape).map(([key, value]) => {
				return [key, value._def.defaultValue()];
			})
		);
	})();

	const initialValues = (() => {
		return Object.fromEntries(
			Object.entries(data).map(([key, value]) => {
				const node = form.nodes?.find((x) => x.identifier === key);

				if (node?.node_type === "trans") {
					const values = data.translations?.[key];

					return [key, values ?? value];
				}

				return [key, value];
			})
		);
	})();

	const reactForm = useReactForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: { ...defaultValues, ...initialValues },
	});

	return reactForm;
};

export default useForm;

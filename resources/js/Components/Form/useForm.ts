import { useForm as useReactForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function generateFormSchema(nodes: FormNodeType[]) {
	const schemaObject: Record<string, z.Schema> = {};

	nodes.map((node) => {
		let schema: z.ZodTypeAny;

		switch (node.node_type) {
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
			default:
				return;
		}

		if (node.min && schema instanceof z.ZodString) {
			schema = schema.min(Number(node.min));
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

const useForm = ({ data = {}, form }: useFormProps) => {
	let schema = generateFormSchema(form.nodes ?? []);

	const defaultValues = (() => {
		return Object.fromEntries(
			Object.entries(schema.shape).map(([key, value]) => {
				return [key, value._def.defaultValue()];
			})
		);
	})();

	const reactForm = useReactForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: { ...defaultValues, ...data },
	});

	return reactForm;
};

export default useForm;

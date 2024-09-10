import type { Resource } from "@narsil-ui/Types";

export type FormNodeNodeType = "card" | "editor" | "number" | "section" | "select" | "string" | "switch" | "trans";

export type FormModel = {
	active: boolean;
	created_at: string;
	id: number;
	nodes: FormNodeModel[];
	options: any;
	owner_id: number;
	owner_type: string;
	slug: string;
	title: string;
	updated_at: string;
};

export type FormNodeModel = {
	active: boolean;
	auto_complete: string;
	created_at: string;
	description: string;
	form_id: number;
	form: FormModel;
	id: number;
	identifier: string;
	label: string;
	max: number;
	min: number;
	node_type: FormNodeNodeType;
	parameters: any;
	parent_id: number;
	placeholder: string;
	required: boolean;
	type: string;
	updated_at: string;
};

export type FormNodeOptionModel = {
	active: boolean;
	created_at: string;
	id: number;
	label: string;
	node_id: number;
	node: FormNodeModel;
	updated_at: string;
	value: string;
};

export type FormResource<T> = Resource<T> & {
	form: FormModel;
	model: string;
	slug: string;
	title: string;
};

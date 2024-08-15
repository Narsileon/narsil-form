type FormNodeNodeType = "card" | "editor" | "number" | "section" | "select" | "string" | "switch";

type FormNodeOptionModel = {
	active: boolean;
	created_at: string;
	id: number;
	label: string;
	node_id: number;
	node: FormNodeModel;
	updated_at: string;
	value: string;
};

type FormNodeModel = {
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

type FormModel = {
	active: boolean;
	created_at: string;
	id: number;
	nodes: FormNodeModel[];
	owner_id: number;
	owner_type: string;
	slug: string;
	title: string;
	updated_at: string;
};

type InputPlaceholderType = {
	example?: string;
	label: string;
	value: string;
};

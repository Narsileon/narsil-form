type FormNodeOptionType = {
	active: boolean;
	created_at: string;
	id: number;
	label: string;
	node_id: number;
	updated_at: string;
	value: string;
	node: FormNodeType;
};

type FormNodeType = {
	active: boolean;
	auto_complete: string;
	created_at: string;
	description: string;
	form_id: number;
	form: FormType;
	id: number;
	identifier: string;
	label: string;
	max: number;
	min: number;
	node_type: string;
	parameters: any;
	parent_id: number;
	placeholder: string;
	required: boolean;
	type: string;
	updated_at: string;
};

type FormType = {
	active: boolean;
	created_at: string;
	id: number;
	owner_id: number;
	owner_type: string;
	slug: string;
	title: string;
	updated_at: string;
};

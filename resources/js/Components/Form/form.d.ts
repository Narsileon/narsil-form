type SubmitParametersType = {
	preserveScroll?: boolean;
	preserveState?: boolean;
	onError?: (errors: Record<string, string>) => void;
	onSuccess?: () => void;
};

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
	className?: string;
	method?: "patch" | "post";
	route: string;
	submitParameters?: SubmitParametersType;
}

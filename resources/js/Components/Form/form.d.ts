interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
	className?: string;
	method?: "patch" | "post";
	route: string;
	submitParameters?: {
		onError?: (errors: Record<string, string>) => void;
		onSuccess?: () => void;
	};
}

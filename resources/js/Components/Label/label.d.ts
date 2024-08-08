type LabelVariantProps = import("class-variance-authority").VariantProps<typeof import("./Label").labelVariants>;

interface LabelProps extends React.ComponentProps<typeof import("@radix-ui/react-label").Root>, LabelVariantProps {}

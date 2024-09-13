import { LanguageModel } from "@narsil-localization/Types";
import { z, ZodOptional, ZodString } from "zod";

export const getTransDefault = (languages: LanguageModel[]) => {
	return {
		default_value: "",
		values: languages.reduce(
			(acc, language) => {
				acc[language.id] = "";
				return acc;
			},
			{} as Record<number, string>
		),
	};
};

export const getTransSchema = (languages: LanguageModel[]) => {
	return z.object({
		default_value: z.string().min(1),
		id: z.number().optional(),
		values: z.object(
			languages.reduce(
				(acc, language) => {
					acc[language.id] = z.string().optional();
					return acc;
				},
				{} as Record<number, ZodOptional<ZodString>>
			)
		),
	});
};

export const getTreeSchema: () => z.ZodType<any> = () => {
	return z.lazy(() =>
		z.object({
			children: z.array(getTreeSchema()),
			collapsed: z.boolean().optional(),
			id: z.number(),
		})
	);
};

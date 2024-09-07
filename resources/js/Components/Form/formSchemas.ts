import { LanguageModel } from "@narsil-localization/Types";
import { z, ZodOptional, ZodString } from "zod";

export const transSchema = (languages: LanguageModel[]) => {
	return z.object({
		default_value: z.string().nullable(),
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

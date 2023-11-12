import { z } from "zod";

import { builderFormSchema } from "../schema/builder";

export type BuilderFormType = z.infer<typeof builderFormSchema>
import { createLoginSchema } from "../schemas/login.schemas";
import { z } from "zod";

export type ILoginRequest = z.infer<typeof createLoginSchema>;

import { hashSync } from "bcryptjs";
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email().max(100),
  password: z
    .string()
    .min(3)
    .max(120)
    .transform((pass) => {
      return hashSync(pass, 10);
    }),
  admin: z.boolean(),
});

export const returnUserSchema = createUserSchema.extend({
  id: z.number(),
  active: z.boolean(),
});

export const returnUserSchemaWithoutPassword = returnUserSchema.omit({
  password: true,
});

export const updateUserSchema = createUserSchema
  .partial()
  .omit({ admin: true });

export const allUserSchema = z.array(returnUserSchemaWithoutPassword);

import { z } from "zod";

export const uploadSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .min(1, "Please select at least one file")
    .max(10, "Maximum 10 files allowed"),
  description: z.string().optional(),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed").optional(),
});

export type UploadFormData = z.infer<typeof uploadSchema>;

import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  email: z.string().email("Enter a valid email"),
  location: z.string().min(5, "Please enter a complete delivery address"),
});
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
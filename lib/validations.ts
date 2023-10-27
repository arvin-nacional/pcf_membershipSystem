import { z } from "zod";
import { validateDate } from "./utils";

export const MemberSchema = z.object({
  lastName: z.string().min(1),
  firstName: z.string().min(1),
  // middleName: z.string().min(1).max(130),
  // suffix: z.string(),
  emailAddress: z.string().min(5).email(),
  contactNumber: z.string().min(11),
  homeAddress: z.string().min(5).max(130),
  emergencyContactPerson: z.string().min(1).max(130),
  emergencyContactNumber: z.string().min(11),
  highestEducation: z.string(),
  preferredLanguage: z.string(),
  birthday: z.string().trim().refine(validateDate, {
    message:
      "Invalid date. Please use the MM/DD/YYYY format and ensure the date is valid.",
  }),
  gender: z.string().min(1),
  memberType: z.string().min(1),
  waterBaptism: z.string().trim().refine(validateDate, {
    message:
      "Invalid date. Please use the MM/DD/YYYY format and ensure the date is valid.",
  }),
  followUpSeries: z.string(),
  lifeGearSeries: z.string(),
  primaryMinistry: z.string(),
  status: z.string().min(1),
  spiritualGifts: z.array(z.string()),
  secondaryMinistries: z.array(z.string()),
  trainings: z.array(z.string()),

  // status: z.string(),
  // memberPhoto: z.string(),
});
//   explanation: z.string().min(20),
//   tags: z.array(z.string().min(1).max(15)).min(1).max(3),

// export const AnswerSchema = z.object({
//   answer: z.string().min(100),
// });

import { z } from "zod";

export const MemberSchema = z.object({
  lastName: z.string().min(5).max(130),
  firstName: z.string().min(5).max(130),
  middleName: z.string().min(5).max(130),
  suffix: z.string(),
  emailAddress: z.string().min(5),
  contactNumber: z.number().min(11),
  homeAddress: z.string().min(5).max(130),
  emergencyContactPerson: z.string().min(5).max(130),
  emergencyContactNumber: z.number().min(11),
  heighestEducationalAttainment: z.string(),
  preferredLanguage: z.string().min(1),
  birthday: z.date(),
  gender: z.string(),
  memberType: z.string(),
  status: z.string(),
  memberPhoto: z.string(),

  //   explanation: z.string().min(20),
  //   tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

// export const AnswerSchema = z.object({
//   answer: z.string().min(100),
// });

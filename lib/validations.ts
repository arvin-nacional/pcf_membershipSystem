import { z } from "zod";

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
  // preferredLanguage: z.string().min(1),
  birthday: z.string().refine(
    (value) => {
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateRegex.test(value)) {
        return false; // Input doesn't match the MM/DD/YYYY format
      }
      const parts = value.split("/");
      const month = parseInt(parts[0], 10);
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      if (month < 1 || month > 12 || day < 1 || day > 31) {
        return false; // Month and day are out of range
      }

      const isLeapYear = year % 4 === 0;

      if (month === 2 && day > 29) {
        return false; // February has a maximum of 29 days in leap years
      } else if (month === 2 && day === 29 && !isLeapYear) {
        return false; // February 29 is only valid in leap years
      } else if (
        (month === 4 || month === 6 || month === 9 || month === 11) &&
        day > 30
      ) {
        return false; // April, June, September, and November have 30 days at most
      }

      return true; // Input is valid
    },
    {
      message:
        "Invalid date. Please use the MM/DD/YYYY format and ensure the date is valid.",
    }
  ),
  gender: z.string(),
  memberType: z.string(),
  // status: z.string(),
  // memberPhoto: z.string(),
});
//   explanation: z.string().min(20),
//   tags: z.array(z.string().min(1).max(15)).min(1).max(3),

// export const AnswerSchema = z.object({
//   answer: z.string().min(100),
// });

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateDate = (value: string): boolean => {
  value = value.replace(/\s/g, "");
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
};
interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}
export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export const calculateAge = (dateString: string): number | null => {
  const [birthMonth, birthDay, birthYear] = dateString.split("/");
  const today = new Date();

  const todayMonth = today.getMonth() + 1; // Adding 1 because getMonth() is zero-based
  const todayDay = today.getDate();

  let age = today.getFullYear() - parseInt(birthYear, 10);

  if (
    todayMonth < parseInt(birthMonth, 10) ||
    (todayMonth === parseInt(birthMonth, 10) &&
      todayDay < parseInt(birthDay, 10))
  ) {
    age--;
  }

  return age < 0 ? null : age;
};

export const capitalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
export const formatDate = (dateString: any) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${month} ${day}, ${year} (${dayOfWeek})`;
};
export const findEventById = (
  events: { _id: string; title: string; start: string; end: string }[],
  id: string
): { _id: string; title: string; start: string; end: string } | undefined =>
  events.find((event) => event._id === id);

export const getTimeOfDay = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleTimeString(undefined, timeOptions);
};

export const formatToMMDDYY = (dateString: string): string => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${month}/${day}/${year}`;
};

export const formatToMonthDayYear = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};

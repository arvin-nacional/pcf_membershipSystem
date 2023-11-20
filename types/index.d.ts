import { BADGE_CRITERIA } from "@/constants";

export interface PieChartProps {
  title: string;
  value: number;
  series: Array<number>;
  colors: Array<string>;
}

export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface MemberNames {
  _id: string;
  name: string;
  value: string;
}

export interface Ministries {
  value: string;
  label: string;
  ministryHead: string;
  members: number;
  ministryPhoto: string;
  description: string;
}
export interface Trainings {
  value: string;
  label: string;
}

export interface SpiritualGifts {
  value: string;
  label: string;
}

export interface MissionExposures {
  value: string;
  label: string;
}

export interface Disciples {}

export interface Job {
  id?: string;
  employer_name?: string;
  employer_logo?: string | undefined;
  employer_website?: string;
  job_employment_type?: string;
  job_title?: string;
  job_description?: string;
  job_apply_link?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
}

export interface Country {
  name: {
    common: string;
  };
}

export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;

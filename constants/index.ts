import { SidebarLink, SpiritualGifts } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Dashboard",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/members",
    label: "Members",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/ministries",
    label: "Ministries",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/calendar",
    label: "Calendar",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/follow-ups",
    label: "Follow Ups",
  },
  // {
  //   imgURL: "/assets/icons/user.svg",
  //   route: "/profile",
  //   label: "Profile",
  // },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/add-member",
    label: "Add a Member",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

export const spiritualGifts: SpiritualGifts[] = [
  { value: "prophecy", label: "Prophecy" },
  { value: "speakingInTongues", label: "Speaking in Tongues" },
  { value: "interpretationOfTongues", label: "Interpretation of Tongues" },
  { value: "wordOfWisdom", label: "Word of Wisdom" },
  { value: "wordOfKnowledge", label: "Word of Knowledge" },
  { value: "faith", label: "Faith" },
  { value: "healing", label: "Healing" },
  { value: "miracles", label: "Miracles" },
  { value: "discerningOfSpirits", label: "Discerning of Spirits" },
  { value: "helps", label: "Helps" },
  { value: "administration", label: "Administration" },
  { value: "leadership", label: "Leadership" },
  { value: "teaching", label: "Teaching" },
  { value: "exhortation", label: "Exhortation" },
  { value: "giving", label: "Giving" },
  { value: "mercy", label: "Mercy" },
  { value: "evangelism", label: "Evangelism" },
  { value: "pastoring", label: "Pastoring" },
  { value: "hospitality", label: "Hospitality" },
  { value: "celibacy", label: "Celibacy" },
];

import { Ministries, SidebarLink, SpiritualGifts, Trainings } from "@/types";

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
  { value: "Prophecy", label: "Prophecy" },
  { value: "Speaking in Tongues", label: "Speaking in Tongues" },
  { value: "Interpretation of Tongues", label: "Interpretation of Tongues" },
  { value: "Word of Wisdom", label: "Word of Wisdom" },
  { value: "Word of Knowledge", label: "Word of Knowledge" },
  { value: "Faith", label: "Faith" },
  { value: "Healing", label: "Healing" },
  { value: "Miracles", label: "Miracles" },
  { value: "Discerning of Spirits", label: "Discerning of Spirits" },
  { value: "Helps", label: "Helps" },
  { value: "Administration", label: "Administration" },
  { value: "Leadership", label: "Leadership" },
  { value: "Teaching", label: "Teaching" },
  { value: "Exhortation", label: "Exhortation" },
  { value: "Giving", label: "Giving" },
  { value: "Mercy", label: "Mercy" },
  { value: "Evangelism", label: "Evangelism" },
  { value: "Pastoring", label: "Pastoring" },
  { value: "Hospitality", label: "Hospitality" },
  { value: "Celibacy", label: "Celibacy" },
];

export const ministries: Ministries[] = [
  { value: "Praise and Worship", label: "Praise and Worship" },
  { value: "Media", label: "Media" },
  { value: "Design", label: "Design" },
  { value: "Events", label: "Events" },
  { value: "Youth", label: "Youth" },
  { value: "Prayer", label: "Prayer" },
  { value: "Ushering", label: "Ushering" },
  { value: "Kids", label: "Kids" },
  { value: "North Cemetery", label: "North Cemetery" },
  { value: "Mission", label: "Mission" },
  { value: "Prison", label: "Prison" },
  { value: "School", label: "School" },
  { value: "None", label: "None" },
];

export const trainings: Trainings[] = [
  { value: "Ushering Team", label: "Ushering Team" },
  { value: "Phileo Empowering", label: "Phileo Empowering" },
  { value: "Worship Team", label: "Worship Team" },
  { value: "Teachers", label: "Teachers" },
  { value: "Life On Mission", label: "Life On Mission" },
  { value: "Evangelism", label: "Evangelism" },
  { value: "Multimedia Class", label: "Multimedia Class" },
];

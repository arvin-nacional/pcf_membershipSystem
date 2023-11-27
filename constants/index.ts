import {
  Ministries,
  MissionExposures,
  SidebarLink,
  SpiritualGifts,
  Trainings,
} from "@/types";

export const summaryInfo = [
  {
    title: "Members",
    value: 684,
    series: [684, 1000],
    colors: ["#BECCDA", "#2ED480"],
  },
  {
    title: "Regular Members",
    value: 683,
    series: [10, 25],
    colors: ["#BECCDA", "#FD8539"],
  },
  {
    title: "Ministries",
    value: 12,
    series: [13, 25],
    colors: ["#BECCDA", "#01545B"],
  },
  {
    title: "Newly Baptized",
    value: 10,
    series: [25, 25],
    colors: ["#BECCDA", "#FE6D8E"],
  },
];

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];
export const memberButtons = [
  { value: "edit", label: "Edit", icon: "/assets/icons/edit-btn.svg" },
  { value: "view", label: "View", icon: "/assets/icons/view-btn.svg" },
  { value: "delete", label: "Delete", icon: "/assets/icons/delete-btn.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Dashboard",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/members?filter=new_members",
    label: "Members",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/ministries",
    label: "Ministries",
  },
  {
    imgURL: "/assets/icons/group.svg",
    route: "/smallGroups",
    label: "Small Groups",
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
  {
    value: "Praise and Worship",
    label: "Praise and Worship",
    ministryHead: "Michael Medalla",
    members: 12,
    ministryPhoto: "/assets/icons/paw.svg",
    description:
      "Involves musicians, singers, and tech teams responsible for leading worship services through music, song, and audiovisual elements.",
  },
  {
    value: "Media",
    label: "Media",
    ministryHead: "Michael Medalla",
    members: 12,
    ministryPhoto: "/assets/icons/media.svg",
    description:
      "Involves musicians, singers, and tech teams responsible for leading worship services through music, song, and audiovisual elements.",
  },
  {
    value: "Design",
    label: "Design",
    ministryHead: "Michael Medalla",
    members: 12,
    ministryPhoto: "/assets/icons/decor2.svg",
    description:
      "Involves musicians, singers, and tech teams responsible for leading worship services through music, song, and audiovisual elements.",
  },
  {
    value: "Events",
    label: "Events",
    ministryHead: "Michael Medalla",
    members: 12,
    ministryPhoto: "/assets/icons/events.svg",
    description:
      "Involves musicians, singers, and tech teams responsible for leading worship services through music, song, and audiovisual elements.",
  },
  {
    value: "Youth",
    label: "Youth",
    ministryHead: "Michael Medalla",
    members: 12,
    ministryPhoto: "/assets/icons/youth.svg",
    description:
      "Involves musicians, singers, and tech teams responsible for leading worship services through music, song, and audiovisual elements.",
  },
  {
    value: "Prayer",
    label: "Prayer",
    ministryHead: "Michael Medalla",
    members: 12,
    ministryPhoto: "/assets/icons/prayerMinistry.png",
    description:
      "Involves musicians, singers, and tech teams responsible for leading worship services through music, song, and audiovisual elements.",
  },
  {
    value: "Ushering",
    label: "Ushering",
    ministryHead: "Michael Medalla",
    members: 12,
    ministryPhoto: "/assets/icons/ushering.svg",
    description:
      "Involves musicians, singers, and tech teams responsible for leading worship services through music, song, and audiovisual elements.",
  },
  {
    value: "Kids",
    label: "Kids",
    ministryHead: "Michael Medalla",
    members: 12,
    ministryPhoto: "/assets/icons/kids.svg",
    description:
      "Involves musicians, singers, and tech teams responsible for leading worship services through music, song, and audiovisual elements.",
  },
  {
    value: "North Cemetery",
    label: "North Cemetery",
    ministryHead: "Michael Medalla",
    members: 12,
    ministryPhoto: "/assets/icons/northCem.svg",
    description:
      "Involves musicians, singers, and tech teams responsible for leading worship services through music, song, and audiovisual elements.",
  },
  {
    value: "Mission",
    label: "Mission",
    ministryHead: "Michael Medalla",
    members: 12,
    ministryPhoto: "/assets/icons/mission.svg",
    description:
      "Involves musicians, singers, and tech teams responsible for leading worship services through music, song, and audiovisual elements.",
  },
  {
    value: "Prison",
    label: "Prison",
    ministryHead: "Michael Medalla",
    members: 12,
    ministryPhoto: "/assets/icons/prison.svg",
    description:
      "Involves musicians, singers, and tech teams responsible for leading worship services through music, song, and audiovisual elements.",
  },
  {
    value: "School",
    label: "School",
    ministryHead: "Michael Medalla",
    members: 12,
    ministryPhoto: "/assets/icons/school.svg",
    description:
      "Involves musicians, singers, and tech teams responsible for leading worship services through music, song, and audiovisual elements.",
  },
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
export const missionExposures: MissionExposures[] = [
  { value: "Community", label: "Community" },
  { value: "Provincial", label: "Provincial" },
  { value: "Foreign", label: "Foreign" },
];

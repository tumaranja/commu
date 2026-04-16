/** Single source of truth for tab labels, section ids, FAB, and avatar menu. */

export type MainTab = "home" | "discover" | "myTown" | "chats";

export type SectionDef = {
  id: string;
  label: string;
  badge?: string;
  children?: SectionDef[];
};

export const mainTabs: { id: MainTab; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "chats", label: "Chats" },
  { id: "discover", label: "Discover" },
  { id: "myTown", label: "My town" },
];

export const sectionsByTab: Record<MainTab, SectionDef[]> = {
  home: [
    {
      id: "home.newest-nearby",
      label: "Nearby",
      children: [
        { id: "home.map-nearby", label: "Map (nearby)", badge: "Great for first-time" },
      ],
    },
    { id: "home.newest-remote", label: "Remote" },
    { id: "home.favorites", label: "Favorites" },
  ],
  discover: [
    {
      id: "discover.posts",
      label: "Posts",
      children: [
        { id: "discover.nearby", label: "Nearby" },
        { id: "discover.search-posts", label: "Search for posts" },
        { id: "discover.found-for-you", label: "Found for you" },
        { id: "discover.popular-country", label: "Popular in Finland" },
      ],
    },
    {
      id: "discover.stories",
      label: "Stories",
      children: [
        { id: "discover.search-stories", label: "Search for stories" },
        { id: "discover.news-commu", label: "News from Commu" },
      ],
    },
    { id: "discover.my-community", label: "Community" },
    { id: "discover.commu-news", label: "News" },
  ],
  myTown: [
    { id: "my-town.citizen-forums", label: "Forums" },
    { id: "my-town.citizen-benefits", label: "Benefits" },
    { id: "my-town.municipality-news", label: "News" },
    {
      id: "my-town.pings",
      label: "Polls",
      children: [
        { id: "my-town.org-messages", label: "Internal messages for organization members" },
        { id: "my-town.resident-polls", label: "Resident polls" },
      ],
    },
  ],
  chats: [],
};

export const fabActions: { id: string; label: string }[] = [
  { id: "create.post", label: "Create post" },
  { id: "create.story", label: "Create story" },
];

export type AvatarMenuGroupId = "user" | "notifications";

/** Tree of rows; `children` nests under the parent row (e.g. Language under Settings). */
export type AvatarMenuEntry = {
  id: string;
  label: string;
  children?: AvatarMenuEntry[];
};

export const avatarMenuByGroup: Record<AvatarMenuGroupId, AvatarMenuEntry[]> = {
  user: [
    { id: "avatar.profile", label: "Profile" },
    { id: "avatar.my-posts", label: "My posts" },
    { id: "avatar.tasks", label: "Tasks" },
    {
      id: "avatar.settings",
      label: "Settings",
      children: [{ id: "avatar.language", label: "Language" }],
    },
    { id: "avatar.help", label: "Help" },
  ],
  notifications: [
    { id: "avatar.new-help-posts", label: "New help posts" },
    { id: "avatar.new-chat-messages", label: "New chat messages" },
    { id: "avatar.new-help-near-you", label: "New help posts near you" },
    { id: "avatar.likes-comments-own", label: "Likes/comments to your own help posts or stories" },
    { id: "avatar.done-deeds", label: "Confirmation on done deeds" },
    { id: "avatar.unconfirmed-tasks", label: "Unconfirmed tasks" },
    { id: "avatar.unconfirmed-help-records", label: "Unconfirmed help records" },
    { id: "avatar.onboarding-tasks", label: "Onboarding tasks" },
    { id: "avatar.done-deed-confirmed", label: "Done deed confirmed" },
  ],
};

/** User-only rows for the avatar menu (notifications use the top-right bell). */
export const userMenuEntries: AvatarMenuEntry[] = avatarMenuByGroup.user;

/** Notification hub rows for the notifications panel. */
export const notificationMenuEntries: AvatarMenuEntry[] = avatarMenuByGroup.notifications;

function labelInSections(sections: SectionDef[], id: string): string | null {
  for (const s of sections) {
    if (s.id === id) return s.label;
    if (s.children?.length) {
      const nested = labelInSections(s.children, id);
      if (nested) return nested;
    }
  }
  return null;
}

export function labelForSectionId(id: string): string {
  if (id === "create.post") return "Create post";
  if (id === "create.story") return "Create story";
  for (const tab of mainTabs) {
    const found = labelInSections(sectionsByTab[tab.id], id);
    if (found) return found;
  }
  return id;
}

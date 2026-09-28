const ICON_ALIASES: Record<string, string> = {
  gear: 'Settings',
  cog: 'Settings',
  settings: 'Settings',
  trash: 'Trash2',
  delete: 'Trash2',
  remove: 'Trash2',
  close: 'X',
  cancel: 'X',
  search: 'Search',
  find: 'Search',
  plus: 'Plus',
  add: 'Plus',
  minus: 'Minus',
  subtract: 'Minus',
  edit: 'Edit',
  pencil: 'Pencil',
  write: 'Pencil',
  home: 'Home',
  house: 'Home',
  user: 'User',
  person: 'User',
  profile: 'User',
  mail: 'Mail',
  email: 'Mail',
  envelope: 'Mail',
  calendar: 'Calendar',
  date: 'Calendar',
  download: 'Download',
  upload: 'Upload',
  filter: 'Filter',
  menu: 'Menu',
  hamburger: 'Menu',
  check: 'Check',
  tick: 'Check',
  star: 'Star',
  favorite: 'Star',
  heart: 'Heart',
  like: 'Heart',
  link: 'Link',
  url: 'Link',
  external: 'ExternalLink',
  'external-link': 'ExternalLink',
  info: 'Info',
  information: 'Info',
  bell: 'Bell',
  notification: 'Bell',
  alert: 'Bell',
  folder: 'Folder',
  archive: 'Archive',
  copy: 'Copy',
  duplicate: 'Copy',
  eye: 'Eye',
  view: 'Eye',
  loader: 'Loader2',
  loading: 'Loader2',
  spinner: 'Loader2',
  arrow: 'ArrowRight',
  'arrow-right': 'ArrowRight',
  chevron: 'ChevronRight',
  'chevron-right': 'ChevronRight',
  'chevron-down': 'ChevronDown',
  more: 'MoreHorizontal',
  ellipsis: 'MoreHorizontal',
};

export function resolveIconQuery(query: string, iconNames: string[]): string[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return iconNames;
  }

  const aliasTarget = ICON_ALIASES[normalized];
  const matches = new Set<string>();

  for (const icon of iconNames) {
    if (icon.toLowerCase().includes(normalized)) {
      matches.add(icon);
    }
  }

  if (aliasTarget && iconNames.includes(aliasTarget)) {
    matches.add(aliasTarget);
  }

  for (const [alias, target] of Object.entries(ICON_ALIASES)) {
    if (alias.includes(normalized) && iconNames.includes(target)) {
      matches.add(target);
    }
  }

  return Array.from(matches).sort((a, b) => a.localeCompare(b));
}

export function resolveIconName(iconName: string, iconNames: string[]): string | undefined {
  const direct = iconNames.find((icon) => icon.toLowerCase() === iconName.toLowerCase());
  if (direct) {
    return direct;
  }

  const alias = ICON_ALIASES[iconName.toLowerCase()];
  if (alias) {
    return iconNames.find((icon) => icon === alias);
  }

  return iconNames.find((icon) => icon.toLowerCase().includes(iconName.toLowerCase()));
}

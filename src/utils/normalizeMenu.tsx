import type { SideNavigationProps } from '@cloudscape-design/components';

type CustomMenuItem = {
  text: string;
  href?: string;
  submenu?: CustomMenuItem[];
};

export const normalizeMenuItens = (
  items: CustomMenuItem[]
): SideNavigationProps.Item[] => {
  return items.map((item): SideNavigationProps.Item => {
    if (item.submenu && item.submenu.length > 0) {
      // variante "expandable-link-group"
      return {
        type: 'expandable-link-group',
        text: item.text,
        items: normalizeMenuItens(item.submenu),
        href: '#', 
      };
    }

    // variante "link"
    return {
      type: 'link',
      text: item.text,
      href: item.href || '#'
    };
  });
};

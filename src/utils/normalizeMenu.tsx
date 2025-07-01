import type { SideNavigationProps } from '@cloudscape-design/components';

type CustomMenuItem = {
  text: string;
  href?: string;
  submenu?: CustomMenuItem[];
};

export const normalizeMenuItens = (items: CustomMenuItem[]): SideNavigationProps.Item[] => {
  return items.map((item) => {
    if (item.submenu && item.submenu.length > 0) {
      return {
        type: 'expandable-link-group',
        text: item.text,
        items: normalizeMenuItens(item.submenu), // chamada recursiva
      };
    }

    return {
      type: 'link',
      text: item.text,
      href: item.href || '#',
    };
  });
};

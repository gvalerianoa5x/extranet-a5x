import React, { useEffect, useState } from 'react';
import type { SideNavigationProps } from '@cloudscape-design/components';
import { BreadcrumbGroup } from '@cloudscape-design/components';


import '../../../../index.css';
import { normalizeMenuItens } from '../../../../utils/normalizeMenu';
import { menuItens } from '../Sidebar';


function isLink(item: SideNavigationProps.Item): item is SideNavigationProps.Link {
  return item.type === 'link';
}

function isExpandableLinkGroup(item: SideNavigationProps.Item): item is SideNavigationProps.ExpandableLinkGroup {
  return item.type === 'expandable-link-group';
}

function hasText(item: SideNavigationProps.Item): item is SideNavigationProps.Item & { text: string } {
  return 'text' in item && typeof item.text === 'string';
}

function findItemPathByHref(
  items: readonly SideNavigationProps.Item[],
  href: string,
  path: SideNavigationProps.Item[] = []
): SideNavigationProps.Item[] | null {
  for (const item of items) {
    if (isLink(item) && item.href === href) {
      return [...path, item];
    }
    if (isExpandableLinkGroup(item) && item.items) {
      const result = findItemPathByHref(item.items, href, [...path, item]);
      if (result) return result;
    }
  }
  return null;
}

const BreadcrumbsComponent: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#');
  const normalizedItems = normalizeMenuItens(menuItens);

  useEffect(() => {
    const onHashChange = () => setCurrentHash(window.location.hash || '#');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const dashboardBreadcrumb: SideNavigationProps.Link = { type: 'link', text: 'A5X', href: '#' };

  const path = findItemPathByHref(normalizedItems, currentHash) || [];

  const breadcrumbItems: SideNavigationProps.Item[] = [dashboardBreadcrumb, ...path];

  const breadcrumbGroupItems = breadcrumbItems
    .filter(hasText)
    .map((item, index, array) => {
      const isLast = index === array.length - 1;
      return {
        text: item.text,
        href: isLink(item) && !isLast ? item.href : '#',
      };
    });

  return (
    <div className="flex py-2 px-6 bg-neutral-5 custom-breadcrumb h-full items-center w-full">
      <BreadcrumbGroup
        items={breadcrumbGroupItems}
        ariaLabel="Navegação hierárquica"
      />
    </div>
  );
};

export default BreadcrumbsComponent;

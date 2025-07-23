import { type ReactElement, isValidElement } from "react";
import apiEsi from "./apis/apiEsi";

type MenuItem = {
  text: string;
  href?: string;
  icon?: React.ReactNode;
  submenu?: MenuItem[];
};


export const getLastPages = async () => {
  const payload = {
    userId: 74
  };

  const { data } = await apiEsi.post('get_ultimas_paginas/flows', payload);
  return data.retorno
};

export const setPageCount = async (parentItem: MenuItem, count:number) => {
  
  let iconName: string | undefined;

  if (
    isValidElement(parentItem.icon) &&
    (parentItem.icon as ReactElement<any>).props?.name
  ) {
    iconName = (parentItem.icon as ReactElement<{ name: string; size?: number }>).props.name;
  }

  const payload = {
    page: parentItem.text,
    menu: parentItem.text,
    icon: iconName,
    submenu: parentItem.submenu ? parentItem.submenu[0] : "",
    userId: 74,
    count: count
  };

  const { data } = await apiEsi.post('atualiza_ultimas_paginas/flows', payload);
  return data.retorno
};

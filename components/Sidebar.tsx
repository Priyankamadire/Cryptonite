import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import {
  ArticleIcon,
  CollapsIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  AboutIcon,
  RateGraphIcon,
} from "./icons";

interface MenuItem {
  id: number;
  label: string;
  icon: React.ComponentType; 
  link: string;
}

const menuItems: MenuItem[] = [
  { id: 1, label: "Dashboard", icon: HomeIcon, link: "/" },
  { id: 4, label: "About Page", icon: AboutIcon, link: "/about" },
  { id: 5, label: "Changing Rate", icon: RateGraphIcon, link: "/rates" },
  { id: 2, label: "Coins", icon: ArticleIcon, link: "/products" },
  { id: 3, label: "Graph Rate", icon: RateGraphIcon, link: "/coin/[id]" },
];

const Sidebar: React.FC = () => {
  const [toggleCollapse, setToggleCollapse] = useState<boolean>(false);
  const [isCollapsible, setIsCollapsible] = useState<boolean>(false);

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col",
    {
      "w-80": !toggleCollapse,
      "w-20": toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu: MenuItem) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        "bg-light-lighter": activeMenu?.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <LogoIcon />
            <span
              className={classNames("mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              Cryptonite
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-24">
  {menuItems.map((menu: any) => {
    const { icon: Icon, ...rest } = menu;
    const classes = getNavItemClasses(menu);
    return (
      <div key={menu.id} className={classes}>
        <Link href={menu.link} passHref>
          <a className="flex py-4 px-3 items-center w-full h-full">
            <div style={{ width: "2.5rem" }}>
              <Icon />
            </div>
            {!toggleCollapse && (
              <span className="text-md font-medium text-text-light">
                {menu.label}
              </span>
            )}
          </a>
        </Link>
      </div>
    );
  })}
</div>

      </div>

      <div className={`${getNavItemClasses({ id: -1, label: "", icon: LogoutIcon, link: "" })} px-3 py-4`}>
        <LogoutIcon />
      </div>
    </div>
  );
};

export default Sidebar;

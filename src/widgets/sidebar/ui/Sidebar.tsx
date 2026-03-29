import {
  CustomerServiceOutlined,
  LogoutOutlined,
  MessageOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Tooltip, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { navItems } from "@features/navigation/model/menu";

import styles from "./Sidebar.module.scss";

const sectionLabels: Record<"overview" | "operations" | "platform", string> = {
  overview: "Основное",
  operations: "Операции",
  platform: "Платформа"
};

export const Sidebar = () => {
  const groupedItems: Array<{
    key: "overview" | "operations" | "platform";
    items: typeof navItems;
  }> = [
    { key: "overview", items: navItems.filter((item) => item.section === "overview") },
    { key: "operations", items: navItems.filter((item) => item.section === "operations") },
    { key: "platform", items: navItems.filter((item) => item.section === "platform") }
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandCard}>
        <img src="/logo.svg" alt="userflow" className={styles.logo} />
      </div>

      {groupedItems.map((group) => (
        <div className={styles.section} key={group.key}>
          <Typography.Text className={styles.sectionTitle}>
            {sectionLabels[group.key]}
          </Typography.Text>
          <nav className={styles.nav}>
            {group.items.map((item) => (
              <NavLink
                to={item.path}
                key={item.path}
                className={({ isActive }) =>
                  isActive ? `${styles.item} ${styles.active}` : styles.item
                }
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      ))}

      <div className={styles.footerLinks}>
        <button type="button" className={styles.helpItem}>
          <CustomerServiceOutlined />
          <span>Справка</span>
        </button>
        <button type="button" className={styles.helpItem}>
          <MessageOutlined />
          <span>Обратная связь</span>
        </button>
        <button type="button" className={styles.helpItem}>
          <SettingOutlined />
          <span>Настройки</span>
        </button>
      </div>

      <Tooltip placement="top" title="Выход">
        <button type="button" className={styles.exit} aria-label="Выход">
          <LogoutOutlined />
        </button>
      </Tooltip>
    </aside>
  );
};

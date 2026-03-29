import "dayjs/locale/ru";
import { BellOutlined, SettingOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { navItems } from "@features/navigation/model/menu";

import styles from "./Topbar.module.scss";

const routeTitle = (pathname: string) => {
  const matched = navItems.find((item) => pathname.startsWith(item.path));
  if (matched) {
    return matched.label;
  }
  if (pathname.includes("/knowledge-base/")) {
    return "Статья базы знаний";
  }
  if (pathname.includes("/users/")) {
    return "Профиль сотрудника";
  }
  return "Дашборд";
};

export const Topbar = () => {
  const location = useLocation();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const formattedDate = useMemo(() => dayjs(now).locale("ru").format("D MMMM YYYY"), [now]);

  return (
    <header className={styles.topbar}>
      <div>
        <Typography.Title level={3} className={styles.title}>
          {routeTitle(location.pathname)}
        </Typography.Title>
        <Typography.Text className={styles.date}>Сегодня, {formattedDate}</Typography.Text>
      </div>

      <div className={styles.actions}>
        <Button icon={<SettingOutlined />} className={styles.iconBtn} />
        <Button icon={<BellOutlined />} className={styles.iconBtn} />
        <Button icon={<UsergroupAddOutlined />} className={styles.iconBtn} />
        <div className={styles.avatars}>
          <Avatar size={24} style={{ background: "#1f2937", color: "#f8fafc" }}>
            AV
          </Avatar>
          <Avatar size={24} style={{ background: "#3b82f6", color: "#f8fafc" }}>
            MB
          </Avatar>
          <Avatar size={24} style={{ background: "#f97316", color: "#f8fafc" }}>
            +3
          </Avatar>
        </div>
      </div>
    </header>
  );
};

import {
  ApartmentOutlined,
  ApiOutlined,
  DashboardOutlined,
  FileTextOutlined,
  ReadOutlined,
  RobotOutlined,
  ToolOutlined
} from "@ant-design/icons";
import { ReactNode } from "react";

export interface NavItem {
  path: string;
  label: string;
  icon: ReactNode;
  section: "overview" | "operations" | "platform";
}

export const navItems: NavItem[] = [
  { path: "/dashboard", label: "Дашборд", icon: <DashboardOutlined />, section: "overview" },
  { path: "/assets", label: "Активы", icon: <ToolOutlined />, section: "overview" },
  {
    path: "/org-structure",
    label: "Оргструктура",
    icon: <ApartmentOutlined />,
    section: "overview"
  },
  { path: "/requests", label: "Запросы", icon: <FileTextOutlined />, section: "operations" },
  { path: "/knowledge-base", label: "База знаний", icon: <ReadOutlined />, section: "operations" },
  { path: "/automation", label: "Автоматизация", icon: <RobotOutlined />, section: "platform" },
  { path: "/integrations", label: "Интеграции", icon: <ApiOutlined />, section: "platform" }
];

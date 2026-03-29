import { ConfigProvider, theme } from "antd";
import ruRU from "antd/locale/ru_RU";
import { Outlet } from "react-router-dom";

import { Sidebar } from "@widgets/sidebar/ui/Sidebar";
import { Topbar } from "@widgets/topbar/ui/Topbar";

import styles from "./AppLayout.module.scss";

export const AppLayout = () => {
  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#ff6b3d",
          colorInfo: "#ff6b3d",
          colorSuccess: "#16a34a",
          colorWarning: "#ea580c",
          colorError: "#be123c",
          borderRadius: 12,
          colorBgBase: "#f3f4f6",
          colorTextBase: "#111827",
          colorBorder: "#e4e7ec",
          fontFamily: 'Manrope, "Segoe UI", sans-serif',
          fontSize: 14
        },
        components: {
          Card: {
            colorBgContainer: "#ffffff",
            colorBorderSecondary: "#e4e7ec"
          },
          Table: {
            headerBg: "#f8fafc",
            headerColor: "#6b7280",
            colorBgContainer: "#ffffff",
            rowHoverBg: "#f8fafc"
          },
          Input: {
            colorBgContainer: "#ffffff",
            colorBorder: "#e4e7ec",
            colorTextPlaceholder: "#94a3b8",
            controlHeight: 38,
            fontSize: 14,
            colorText: "#111827"
          },
          Select: {
            controlHeight: 38,
            fontSize: 14
          },
          DatePicker: {
            controlHeight: 38,
            fontSize: 14
          },
          Button: {
            defaultBg: "#ffffff",
            defaultBorderColor: "#e4e7ec",
            defaultColor: "#374151",
            primaryShadow: "none"
          }
        }
      }}
    >
      <div className={styles.pageBg}>
        <div className={styles.frame}>
          <Sidebar />
          <div className={styles.main}>
            <Topbar />
            <main className={styles.content}>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

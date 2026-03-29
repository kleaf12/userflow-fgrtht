import { ReactNode } from "react";

import styles from "./PageContainer.module.scss";

interface PageContainerProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

export const PageContainer = ({ action, children }: PageContainerProps) => {
  return (
    <section className={styles.page}>
      {action ? <header className={styles.headerActions}>{action}</header> : null}
      <div className={styles.content}>{children}</div>
    </section>
  );
};

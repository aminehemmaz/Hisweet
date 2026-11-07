import type { ReactNode } from "react";
import styles from "./StaticPage.module.css";

export default function StaticPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <main className={`container ${styles.page}`}>
      <header className={styles.head}>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </header>
      <div className={styles.content}>{children}</div>
    </main>
  );
}

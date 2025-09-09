'use client';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  function onStart() {
    router.push('/mainpage');
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.title}>Hello, Masa 🌷</h1>
        <p className={styles.subtitle}>welcome back, ready to grow your garden?</p>
        <button className={styles.button} onClick={onStart}>get to work</button>
      </div>
    </div>
  );
}


'use client';

import { cn } from '@/lib/utils';
import styles from './BlockchainBackground.module.css';

export function BlockchainBackground() {
  return (
    <div className={styles.background}>
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className={cn(styles.dot, styles[`dot-${i + 1}`])}></div>
      ))}
    </div>
  );
}

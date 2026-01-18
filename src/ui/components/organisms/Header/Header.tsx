/**
 * Header Organism Component
 * Site header with navigation and social links
 */
import { APP_CONFIG } from '../../../../config';
import { Icon, Text } from '../../atoms';
import styles from './Header.module.css';

export function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img
            src="/logo.png"
            alt="The Hub logo"
            className={styles.logoImage}
          />
          <Text as="span" variant="h5" className={styles.logo}>
            {APP_CONFIG.siteName}
          </Text>
        </div>

        <nav className={styles.nav} aria-label="Social links">
          <a
            href={APP_CONFIG.authorGithub}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
            aria-label="GitHub repository"
          >
            <Icon name="github" size="md" />
          </a>
        </nav>
      </div>
    </header>
  );
}

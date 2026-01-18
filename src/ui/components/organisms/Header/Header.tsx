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
            aria-label="GitHub profile"
          >
            <Icon name="github" size="md" />
          </a>
          <a
            href={APP_CONFIG.authorLinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
            aria-label="LinkedIn profile"
          >
            <Icon name="linkedin" size="md" />
          </a>
          <a
            href={`mailto:${APP_CONFIG.authorEmail}`}
            className={styles.navLink}
            aria-label="Send email"
          >
            <Icon name="mail" size="md" />
          </a>
        </nav>
      </div>
    </header>
  );
}

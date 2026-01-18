/**
 * Footer Organism Component
 * Site footer with credits and social links
 */
import { APP_CONFIG } from '../../../../config';
import { Icon, Text } from '../../atoms';
import styles from './Footer.module.css';

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Text variant="bodySmall" color="secondary" className={styles.copyright}>
          &copy; {currentYear} {APP_CONFIG.authorName}. Built with passion and
          lots of coffee.
        </Text>

        <nav className={styles.nav} aria-label="Footer social links">
          <a
            href={APP_CONFIG.authorGithub}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
            aria-label="GitHub repository"
          >
            <Icon name="github" size="sm" />
            <span className={styles.linkText}>GitHub</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}

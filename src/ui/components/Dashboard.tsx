/**
 * Dashboard Component
 * Main React component that composes the entire dashboard
 * Used as an Astro island with client:load
 */
import { Footer, Header, ProjectGrid } from './organisms';
import { useProjects } from '../hooks';
import styles from './Dashboard.module.css';

export function Dashboard(): JSX.Element {
  const { projects, isLoading, error, reorder } = useProjects();

  return (
    <>
      <Header />
      <main className={styles.main}>
        {isLoading && (
          <div className={styles.loading} role="status" aria-live="polite">
            <div className={styles.spinner} />
            <span className={styles.loadingText}>Loading projects...</span>
          </div>
        )}

        {error && (
          <div className={styles.error} role="alert">
            <p className={styles.errorTitle}>Failed to load projects</p>
            <p className={styles.errorMessage}>{error.message}</p>
          </div>
        )}

        {!isLoading && !error && projects.length === 0 && (
          <div className={styles.empty}>
            <p>No projects found.</p>
          </div>
        )}

        {!isLoading && !error && projects.length > 0 && (
          <ProjectGrid projects={projects} onReorder={reorder} />
        )}
      </main>
      <Footer />
    </>
  );
}

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

export default function PortfolioPage() {
  const { username } = useParams(); // currently unused unless backend supports usernames
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data } = await API.get('/portfolio');
        setPortfolio(data);
      } catch (err) {
        console.error('Error fetching portfolio', err);
      }
    };

    fetchPortfolio();
  }, []);

  if (!portfolio) return <p style={styles.loading}>Loading portfolio...</p>;

  return (
    <div style={styles.container}>
      <h1>Portfolio</h1>
      <p><strong>Bio:</strong> {portfolio.bio}</p>
      <p><strong>Skills:</strong> {portfolio.skills.join(', ')}</p>

      <h2>Projects</h2>
      {portfolio.projects.map((project, index) => (
        <div key={index} style={styles.projectCard}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Visit Project
            </a>
          )}
          <p><strong>Tech Stack:</strong> {project.techStack.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: 'auto'
  },
  projectCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
  },
  loading: {
    textAlign: 'center',
    padding: '2rem'
  }
};

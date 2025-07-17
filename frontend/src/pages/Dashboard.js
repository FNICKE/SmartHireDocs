import { useAuth } from '../context/AuthContext';
import PortfolioForm from '../components/PortfolioForm';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <h2>Welcome, {user?.name} 👋</h2>
      <p>Edit your portfolio below:</p>
      <PortfolioForm />
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  }
};

import { useAuth } from '../context/AuthContext';
import PortfolioForm from '../components/PortfolioForm';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-blue-900 px-4 py-12 flex items-start justify-center">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">
          Welcome, {user?.name} 👋
        </h2>
        <p className="text-gray-600 mb-6">Edit your portfolio below:</p>
        <PortfolioForm />
      </div>
    </div>
  );
}

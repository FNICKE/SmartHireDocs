import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

export default function PortfolioPage() {
  const { username } = useParams(); // Unused for now
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

  if (!portfolio)
    return (
      <p className="text-center text-gray-600 py-10 text-xl">
        Loading portfolio...
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-center">Portfolio</h1>

      <div className="mb-6">
        <p className="mb-2">
          <strong className="font-semibold">Bio:</strong> {portfolio.bio}
        </p>
        <p>
          <strong className="font-semibold">Skills:</strong>{' '}
          {portfolio.skills.join(', ')}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      <div className="space-y-4">
        {portfolio.projects.map((project, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl p-4 shadow hover:shadow-md transition duration-300"
          >
            <h3 className="text-xl font-bold text-blue-700">{project.title}</h3>
            <p className="text-gray-700 my-2">{project.description}</p>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Visit Project
              </a>
            )}

            <p className="mt-2 text-sm text-gray-600">
              <strong>Tech Stack:</strong> {project.techStack.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

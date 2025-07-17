import { useEffect, useState } from 'react';
import API from '../services/api';

export default function PortfolioForm() {
  const [form, setForm] = useState({
    bio: '',
    skills: '',
    projects: [{ title: '', description: '', link: '', techStack: '' }],
  });

  // Fetch portfolio on load
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data } = await API.get('/portfolio');
        if (data) {
          setForm({
            bio: data.bio || '',
            skills: (data.skills || []).join(', '),
            projects: data.projects || [{ title: '', description: '', link: '', techStack: '' }],
          });
        }
      } catch (err) {
        console.log('No portfolio found. Create one.');
      }
    };

    fetchPortfolio();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleProjectChange = (index, field, value) => {
    const updated = [...form.projects];
    updated[index][field] = value;
    setForm({ ...form, projects: updated });
  };

  const addProject = () => {
    setForm({
      ...form,
      projects: [...form.projects, { title: '', description: '', link: '', techStack: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        bio: form.bio,
        skills: form.skills.split(',').map(s => s.trim()),
        projects: form.projects.map(p => ({
          ...p,
          techStack: p.techStack.split(',').map(t => t.trim())
        }))
      };
      await API.post('/portfolio', payload);
      alert('✅ Portfolio saved!');
    } catch (err) {
      alert('❌ Failed to save portfolio');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <textarea
        name="bio"
        placeholder="Short bio"
        value={form.bio}
        onChange={handleChange}
        rows={4}
      />
      <input
        type="text"
        name="skills"
        placeholder="Skills (comma separated)"
        value={form.skills}
        onChange={handleChange}
      />
      
      <h4>Projects</h4>
      {form.projects.map((project, index) => (
        <div key={index} style={styles.project}>
          <input
            type="text"
            placeholder="Title"
            value={project.title}
            onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={project.description}
            onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
          />
          <input
            type="text"
            placeholder="Link"
            value={project.link}
            onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
          />
          <input
            type="text"
            placeholder="Tech Stack (comma separated)"
            value={project.techStack}
            onChange={(e) => handleProjectChange(index, 'techStack', e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addProject}>Add Project</button>
      <button type="submit">Save Portfolio</button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '600px',
    margin: '2rem auto'
  },
  project: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '5px'
  }
};

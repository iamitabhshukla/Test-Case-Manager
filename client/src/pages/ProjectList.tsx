import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import CreateProjectModal from '../components/CreateProjectModal';

interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
    User?: {
        username: string;
    };
}

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const response = await api.get('/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleProjectCreated = (newProject: Project) => {
        setProjects([newProject, ...projects]);
    };

    if (loading) return <div>Loading projects...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Projects</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                >
                    Create Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                        <p className="text-gray-600 mb-4 h-12 overflow-hidden text-ellipsis">{project.description}</p>
                        <div className="flex justify-between items-center text-sm">
                            <span className={`px-2 py-1 rounded ${project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {project.status}
                            </span>
                            <span className="text-gray-500">By: {project.User?.username || 'Unknown'}</span>
                        </div>
                        <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-semibold">
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <CreateProjectModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onProjectCreated={handleProjectCreated}
                />
            )}
        </div>
    );
};

export default ProjectList;

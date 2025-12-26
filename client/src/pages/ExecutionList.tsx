import React, { useEffect, useState } from 'react';
import api from '../api/axios';

interface Execution {
    id: number;
    status: string;
    result: string;
    comments: string;
    createdAt: string;
    User?: {
        username: string;
    };
}

const ExecutionList: React.FC = () => {
    const [executions, setExecutions] = useState<Execution[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExecutions = async () => {
            try {
                const response = await api.get('/test-executions');
                setExecutions(response.data);
            } catch (error) {
                console.error('Error fetching executions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExecutions();
    }, []);

    if (loading) return <div>Loading executions...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Test Executions</h1>

            <div className="bg-white rounded shadow overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Tester
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Comments
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {executions.map((exec) => (
                            <tr key={exec.id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {exec.id}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span className={`px-2 py-1 rounded text-sm font-semibold ${exec.status === 'Pass' ? 'bg-green-100 text-green-800' :
                                            exec.status === 'Fail' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {exec.status}
                                    </span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {exec.User?.username}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {new Date(exec.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {exec.comments}
                                </td>
                            </tr>
                        ))}
                        {executions.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    No executions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExecutionList;

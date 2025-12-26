import React, { useEffect, useState } from 'react';
import api from '../api/axios';

interface TestCase {
    id: number;
    title: string;
    priority: string;
    type: string;
    TestSuite?: {
        name: string;
    };
}

const TestCaseList: React.FC = () => {
    const [testCases, setTestCases] = useState<TestCase[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ search: '', priority: '', type: '' });

    const fetchTestCases = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filter.search) params.append('search', filter.search);
            if (filter.priority) params.append('priority', filter.priority);
            if (filter.type) params.append('type', filter.type);

            const response = await api.get(`/test-cases?${params.toString()}`);
            setTestCases(response.data);
        } catch (error) {
            console.error('Error fetching test cases:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestCases();
    }, [filter]); // Re-fetch when filter changes

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Test Cases</h1>

            {/* Filters */}
            <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-4">
                <input
                    type="text"
                    name="search"
                    placeholder="Search by title..."
                    value={filter.search}
                    onChange={handleFilterChange}
                    className="border rounded px-3 py-2 flex-grow"
                />
                <select
                    name="priority"
                    value={filter.priority}
                    onChange={handleFilterChange}
                    className="border rounded px-3 py-2"
                >
                    <option value="">All Priorities</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select
                    name="type"
                    value={filter.type}
                    onChange={handleFilterChange}
                    className="border rounded px-3 py-2"
                >
                    <option value="">All Types</option>
                    <option value="Functional">Functional</option>
                    <option value="Integration">Integration</option>
                    <option value="Regression">Regression</option>
                    <option value="Smoke">Smoke</option>
                    <option value="UI">UI</option>
                    <option value="API">API</option>
                </select>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Suite
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Priority
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {testCases.map((tc) => (
                                <tr key={tc.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {tc.id}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{tc.title}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{tc.TestSuite?.name || '-'}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
                                            <span aria-hidden className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                                            <span className="relative">{tc.type}</span>
                                        </span>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${tc.priority === 'Critical' ? 'text-red-900' :
                                                tc.priority === 'High' ? 'text-orange-900' : 'text-green-900'
                                            }`}>
                                            <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${tc.priority === 'Critical' ? 'bg-red-200' :
                                                    tc.priority === 'High' ? 'bg-orange-200' : 'bg-green-200'
                                                }`}></span>
                                            <span className="relative">{tc.priority}</span>
                                        </span>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button className="text-indigo-600 hover:text-indigo-900 hover:underline">Edit</button>
                                        <span className="mx-2 text-gray-300">|</span>
                                        <button className="text-indigo-600 hover:text-indigo-900 hover:underline">Execute</button>
                                    </td>
                                </tr>
                            ))}
                            {testCases.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                        No test cases found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TestCaseList;

import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/analytics/dashboard');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div>Loading dashboard...</div>;
    if (!stats) return <div>Error loading stats.</div>;

    const pieData = {
        labels: ['Passed', 'Failed'],
        datasets: [
            {
                data: [stats.passedExecutions, stats.failedExecutions],
                backgroundColor: ['#10B981', '#EF4444'],
                hoverBackgroundColor: ['#059669', '#DC2626'],
            },
        ],
    };

    const barData = {
        labels: ['Total Projects', 'Total Test Cases', 'Total Executions'],
        datasets: [
            {
                label: 'Count',
                data: [stats.totalProjects, stats.totalTestCases, stats.totalExecutions],
                backgroundColor: 'rgba(79, 70, 229, 0.6)',
            }
        ]
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded shadow border-l-4 border-indigo-500">
                    <div className="text-gray-500">Total Projects</div>
                    <div className="text-3xl font-bold">{stats.totalProjects}</div>
                </div>
                <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
                    <div className="text-gray-500">Total Test Cases</div>
                    <div className="text-3xl font-bold">{stats.totalTestCases}</div>
                </div>
                <div className="bg-white p-6 rounded shadow border-l-4 border-purple-500">
                    <div className="text-gray-500">Total Executions</div>
                    <div className="text-3xl font-bold">{stats.totalExecutions}</div>
                </div>
                <div className="bg-white p-6 rounded shadow border-l-4 border-green-500">
                    <div className="text-gray-500">Pass Rate</div>
                    <div className="text-3xl font-bold">{stats.passRate}%</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-semibold mb-4">Execution Result Distribution</h3>
                    <div className="h-64 flex justify-center">
                        <Pie data={pieData} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-semibold mb-4">System Content Overview</h3>
                    <div className="h-64">
                        <Bar data={barData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

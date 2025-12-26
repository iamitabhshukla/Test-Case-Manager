const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let token = '';
let projectId = '';
let suiteId = '';
let testCaseId = '';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runVerification() {
    console.log('Starting System Verification...');

    try {
        // 1. Register User
        console.log('\n1. Registering User...');
        try {
            const regRes = await axios.post(`${API_URL}/auth/register`, {
                username: 'verify_admin',
                email: 'verify@example.com',
                password: 'password123',
                role: 'admin'
            });
            token = regRes.data.token;
            console.log('✅ User registered:', regRes.data.user.username);
        } catch (e) {
            if (e.response && e.response.status === 400) {
                console.log('⚠️ User already exists, logging in...');
                const loginRes = await axios.post(`${API_URL}/auth/login`, {
                    email: 'verify@example.com',
                    password: 'password123'
                });
                token = loginRes.data.token;
                console.log('✅ User logged in');
            } else {
                throw e;
            }
        }

        const authHeader = { headers: { Authorization: `Bearer ${token}` } };

        // 2. Create Project
        console.log('\n2. Creating Project...');
        const projRes = await axios.post(`${API_URL}/projects`, {
            name: 'Integration Test Project',
            description: 'Project created by verification script',
            status: 'active'
        }, authHeader);
        projectId = projRes.data.id;
        console.log('✅ Project created:', projRes.data.name);

        // 3. Create Test Suite
        console.log('\n3. Creating Test Suite...');
        const suiteRes = await axios.post(`${API_URL}/test-suites`, {
            project_id: projectId,
            name: 'Smoke Tests',
            description: 'Critical path tests'
        }, authHeader);
        suiteId = suiteRes.data.id;
        console.log('✅ Test Suite created:', suiteRes.data.name);

        // 4. Create Test Case
        console.log('\n4. Creating Test Case...');
        const tcRes = await axios.post(`${API_URL}/test-cases`, {
            suite_id: suiteId,
            title: 'Verify Login Flow',
            description: 'Ensure user can login with valid credentials',
            priority: 'Critical',
            type: 'Functional',
            steps: [{ step: 'Go to login page', expected: 'Login form visible' }, { step: 'Enter creds', expected: 'Dashboard visible' }]
        }, authHeader);
        testCaseId = tcRes.data.id;
        console.log('✅ Test Case created:', tcRes.data.title);

        // 5. Execute Test Case
        console.log('\n5. Executing Test Case...');
        const execRes = await axios.post(`${API_URL}/test-executions`, {
            test_case_id: testCaseId,
            status: 'Pass',
            result: 'Login worked perfectly',
            comments: 'Automated execution'
        }, authHeader);
        console.log('✅ Test Executed, Status:', execRes.data.status);

        // 6. Check Analytics
        console.log('\n6. Checking Analytics...');
        // Wait a bit for potential async processing if any, though our endpoint calculates on fly or cache
        await sleep(1000);
        const statsRes = await axios.get(`${API_URL}/analytics/dashboard`, authHeader);
        console.log('✅ Dashboard Stats:', statsRes.data);

        if (statsRes.data.totalProjects >= 1 && statsRes.data.totalTestCases >= 1) {
            console.log('\n🎉 VERIFICATION SUCCESSFUL! System is operational.');
        } else {
            console.error('\n❌ Verification Failed: Stats do not match expected values.');
        }

    } catch (error) {
        console.error('\n❌ Verification Failed:', error.response ? error.response.data : error.message);
        process.exit(1);
    }
}

runVerification();

document.addEventListener('DOMContentLoaded', () => {
    // Strategy Tab Switcher
    const steps = document.querySelectorAll('.step');
    const contentPane = document.getElementById('plan');

    const strategyData = {
        plan: {
            title: "Enterprise Test Strategy",
            description: "My strategy focuses on **Shift-Left** integration, ensuring quality from the requirement phase. I define clear Entry/Exit criteria and Go/No-Go milestones for every release.",
            features: ["Risk-Based Prioritization (RBT)", "Automated Regression ROI Analysis", "Stakeholder Quality Reporting"],
            link: "https://github.com/tejavathi-qa/QA-Manual-TestCases/blob/main/Strategy-and-Process/Enterprise-Test-Strategy.md"
        },
        data: {
            title: "Test Data Management (TDM)",
            description: "Expertise in handling PII/PHI data through synthetic masking and shuffling. I design environments that are compliant with GDPR and HIPAA while maintaining data integrity.",
            features: ["PII Masking Protocols", "Synthetic Data Generation", "Automated DB Cleanup Scripts"],
            link: "https://github.com/tejavathi-qa/QA-Manual-TestCases/blob/main/Strategy-and-Process/Test-Data-Management.md"
        },
        rca: {
            title: "Root Cause Analysis (RCA)",
            description: "I believe every failure is an opportunity to improve the process. My RCA reports lead to permanent corrective actions and reduced defect leakage in production.",
            features: ["5-Why Analysis Methodology", "Defect Prevention Plans", "Cross-functional Fix Verification"],
            link: "https://github.com/tejavathi-qa/QA-Manual-TestCases/blob/main/Strategy-and-Process/RCA-Report-Template.md"
        }
    };

    steps.forEach(step => {
        step.addEventListener('click', () => {
            // Update Active Class
            steps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');

            // Update Content
            const target = step.getAttribute('data-target');
            const data = strategyData[target];

            contentPane.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <ul class="feature-list">
                    ${data.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <a href="${data.link}" target="_blank" class="btn-outline">Read Full Docs</a>
            `;

            // Simple transition effect
            contentPane.style.opacity = 0;
            setTimeout(() => {
                contentPane.style.opacity = 1;
            }, 50);
        });
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.padding = '1rem 10%';
            nav.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            nav.style.padding = '1.5rem 10%';
            nav.style.background = 'rgba(15, 23, 42, 0.8)';
        }
    });
});

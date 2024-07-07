document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('role-search');
    const suggestions = document.getElementById('suggestions');

    const roles = [
        "Financial Analyst",
        "Investment Banker",
        "Risk Manager",
        "Portfolio Manager",
        "Accountant",
        "Auditor",
        "Tax Specialist",
        "Financial Advisor",
        "Treasury Analyst",
        "Budget Analyst"
    ];

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        suggestions.innerHTML = '';
        if (query) {
            const filteredRoles = roles.filter(role => role.toLowerCase().includes(query));
            filteredRoles.forEach(role => {
                const div = document.createElement('div');
                div.textContent = role;
                div.addEventListener('click', function() {
                    searchInput.value = role;
                    suggestions.innerHTML = '';
                });
                suggestions.appendChild(div);
            });
        }
    });

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.innerHTML = '';
        }
    });
});
// scripts/blog.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Obsługa menu mobilnego (hamburger) ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // --- Dynamiczne generowanie treści bloga ---
    const articleListSidebar = document.querySelector('.article-list');
    const mainContentContainer = document.querySelector('#blog-posts-list');

    if (typeof articles !== 'undefined' && articles.length > 0) {
        
        // 1. Filtruj tylko widoczne artykuły
        const visibleArticles = articles.filter(article => article.visible === true);

        // 2. Sortuj widoczne artykuły od najnowszego do najstarszego
        const sortedArticles = visibleArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 3. Generuj HTML dla menu bocznego (sidebar)
        if (articleListSidebar) {
            const sidebarHTML = sortedArticles.map(article => {
                const formattedDate = new Date(article.date).toLocaleDateString('pl-PL', {
                    day: 'numeric', month: 'long', year: 'numeric'
                });

                return `
                    <li>
                        <a href="${article.file}" class="article-link">
                            <h4>${article.title}</h4>
                            <span class="post-date-small">${formattedDate}</span>
                        </a>
                    </li>
                `;
            }).join('');
            articleListSidebar.innerHTML = sidebarHTML;
        }

        // 4. Generuj HTML dla głównej listy artykułów
        if (mainContentContainer) {
            const mainContentHTML = sortedArticles.map(article => {
                const formattedDate = new Date(article.date).toLocaleDateString('pl-PL', {
                    day: 'numeric', month: 'long', year: 'numeric'
                });

                return `
                    <div class="blog-post-full-card">
                        <h3>${article.title}</h3>
                        <p class="post-date">${formattedDate}</p>
                        <p>${article.excerpt}</p>
                        <a href="${article.file}" class="btn">Czytaj więcej</a>
                    </div>
                `;
            }).join('');
            mainContentContainer.innerHTML = mainContentHTML;
        }
    }

    // --- Podświetlanie aktywnego linku w sidebarze ---
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.article-link').forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active-article');
        }
    });
});
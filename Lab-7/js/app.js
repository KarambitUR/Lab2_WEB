document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('app-content');
    const catalogLink = document.getElementById('catalog-link');
    const heroCatalogBtn = document.getElementById('hero-catalog-btn');

    // Event listeners for catalog navigation
    if (catalogLink) {
        catalogLink.addEventListener('click', (e) => {
            e.preventDefault();
            loadCatalog();
        });
    }

    if (heroCatalogBtn) {
        heroCatalogBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loadCatalog();
        });
    }

    // Function to load and render the categories catalog
    function loadCatalog() {
        showLoading();

        // Simulate network delay for effect, then fetch categories
        setTimeout(() => {
            fetch('data/categories.json')
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(categories => {
                    renderCatalog(categories);
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                    contentArea.innerHTML = `<p style="text-align: center; color: red;">Помилка завантаження каталогу.</p>`;
                });
        }, 300);
    }

    // Render the catalog UI
    function renderCatalog(categories) {
        let html = `
            <div class="animate-fade-in">
                <h2 class="section-title">Каталог товарів</h2>
                <div class="categories-grid">
        `;

        categories.forEach(category => {
            html += `
                <div class="category-card" data-shortname="${category.shortname}">
                    <h3>${category.name}</h3>
                    <p>${category.notes}</p>
                </div>
            `;
        });

        html += `
                </div>
                
                <div class="specials-section">
                    <h2 class="section-title">Спеціальна пропозиція</h2>
                    <p style="margin-bottom: 2rem; color: var(--text-secondary);">Не знаєте що обрати? Довіртесь випадку!</p>
                    <button id="specials-btn" class="btn-large">Мені пощастить (Specials)</button>
                </div>
            </div>
        `;

        contentArea.innerHTML = html;

        // Add event listeners to category cards
        const cards = document.querySelectorAll('.category-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const shortname = card.getAttribute('data-shortname');
                loadCategoryItems(shortname);
            });
        });

        // Add event listener to Specials button
        const specialsBtn = document.getElementById('specials-btn');
        if (specialsBtn) {
            specialsBtn.addEventListener('click', () => {
                // Pick a random category using Math.random()
                const randomIndex = Math.floor(Math.random() * categories.length);
                const randomCategory = categories[randomIndex];
                loadCategoryItems(randomCategory.shortname);
            });
        }
    }

    // Function to load and render specific category items
    function loadCategoryItems(shortname) {
        showLoading();

        setTimeout(() => {
            fetch(`data/${shortname}.json`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    renderCategoryItems(data);
                })
                .catch(error => {
                    console.error('Error fetching category items:', error);
                    contentArea.innerHTML = `
                        <a href="#" class="back-link" id="back-to-catalog">&larr; Назад до каталогу</a>
                        <p style="text-align: center; color: red;">Помилка завантаження товарів.</p>
                    `;
                    document.getElementById('back-to-catalog').addEventListener('click', (e) => {
                        e.preventDefault();
                        loadCatalog();
                    });
                });
        }, 300);
    }

    // Render the items UI
    function renderCategoryItems(data) {
        let html = `
            <div class="animate-fade-in">
                <a href="#" class="back-link" id="back-to-catalog">&larr; Назад до каталогу</a>
                <h2 class="section-title">${data.categoryName}</h2>
                <div class="products-grid">
        `;

        data.items.forEach(item => {
            html += `
                <div class="product-card">
                    <img src="${item.image}" alt="${item.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-title">${item.name}</h3>
                        <p class="product-desc">${item.description}</p>
                        <div class="product-price">${item.price}</div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        contentArea.innerHTML = html;

        // Add event listener to back button
        document.getElementById('back-to-catalog').addEventListener('click', (e) => {
            e.preventDefault();
            loadCatalog();
        });
    }

    // Utility function to show a loading state
    function showLoading() {
        contentArea.innerHTML = `<div class="loading animate-fade-in">Завантаження...</div>`;
    }
});

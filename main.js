// ── 1. OFFER BAR CLOSE ──────────────────────
const closeOffer = document.getElementById('closeOffer');
const offerTag = document.querySelector('.offer_tag');

if (closeOffer && offerTag) {
    closeOffer.addEventListener('click', () => {
        offerTag.style.display = 'none';
    });
}

// ── 2. MOBILE SIDEBAR MENU ──────────────────
const menuToggle = document.getElementById('menuToggle');
const mobileSidebar = document.getElementById('mobileSidebar');
const closeSidebar = document.getElementById('closeSidebar');
const overlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    mobileSidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeSidebarFn() {
    mobileSidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
}

if (menuToggle) menuToggle.addEventListener('click', openSidebar);
if (closeSidebar) closeSidebar.addEventListener('click', closeSidebarFn);
if (overlay) overlay.addEventListener('click', closeSidebarFn);


// ── 3. HERO SLIDER ──────────────────────────
const sliderContainer = document.querySelector('.hero__slider-container');
const images = document.querySelectorAll('.hero__img');
const leftBtn = document.getElementById('slider-left-activate');
const rightBtn = document.getElementById('slider-right-activate');

if (sliderContainer && images.length > 0) {
    let current = 0;

    function goToSlide(index) {
        // wrap around
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        current = index;
        sliderContainer.style.marginLeft = `-${current * 100}vw`;
    }

    if (rightBtn) rightBtn.addEventListener('click', () => goToSlide(current + 1));
    if (leftBtn) leftBtn.addEventListener('click', () => goToSlide(current - 1));

    // auto-play every 4 seconds
    setInterval(() => goToSlide(current + 1), 4000);
}


// ── 4. MOST WANTED — LIKE BUTTON ────────────
const likeButtons = document.querySelectorAll('.like_btn');

likeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('i');
        const isLiked = icon.classList.contains('fa-solid');

        if (isLiked) {
            // unlike
            icon.classList.remove('fa-solid', 'liked');
            icon.classList.add('fa-regular');
        } else {
            // like
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid', 'liked');
        }
    });
});


// ── 5. COLLECTION FILTER ────────────────────

const filterChecks = document.querySelectorAll('.filter-check');
const allProducts = document.querySelectorAll('.product');
const noResults = document.getElementById('noResults');

if (filterChecks.length > 0) {

    function applyFilters() {

        const checkedCategories = [];
        const checkedArrivals = [];

        filterChecks.forEach(cb => {
            if (!cb.checked) return;
            const cat = cb.dataset.category;
            if (cat === 'new' || cat === 'old') {
                checkedArrivals.push(cat);
            } else {
                checkedCategories.push(cat);
            }
        });

        // if nothing is checked at all, show everything
        const nothingChecked = checkedCategories.length === 0 && checkedArrivals.length === 0;

        let visibleCount = 0;

        allProducts.forEach(product => {
            const productCategory = product.dataset.category;
            const productArrival = product.dataset.arrival;

            if (nothingChecked) {
                product.style.display = '';
                visibleCount++;
                return;
            }

            // category match — if no category filters, any category passes
            const categoryPass =
                checkedCategories.length === 0 ||
                checkedCategories.includes(productCategory);

            // arrival match — if no arrival filters, any arrival passes
            const arrivalPass =
                checkedArrivals.length === 0 ||
                checkedArrivals.includes(productArrival);

            if (categoryPass && arrivalPass) {
                product.style.display = '';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });


        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    filterChecks.forEach(cb => cb.addEventListener('change', applyFilters));
}


// ── 6. SEARCH BAR ─────────────────────
const searchInput = document.getElementById('searchInput');

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();

        let visibleCount = 0;

        allProducts.forEach(product => {
            const name = product.querySelector('h3') ? product.querySelector('h3').textContent.toLowerCase() : '';
            if (name.includes(query)) {
                product.style.display = '';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });

        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    });
}

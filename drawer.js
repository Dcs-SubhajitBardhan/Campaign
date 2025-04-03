function toggleDrawer() {
    const drawer = document.getElementById('drawer');
    drawer.style.width = drawer.style.width === '250px' ? '0' : '250px';
}

function toggleSubMenu(id) {
    const submenu = document.getElementById(id);
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
}

// Close the drawer after a link within it is clicked (if it's not a submenu toggle)
const drawerLinks = document.querySelectorAll('#drawer a');
drawerLinks.forEach(link => {
    link.addEventListener('click', function() {
        const href = this.getAttribute('href');
        const isSubmenuToggle = (href === '#' && this.nextElementSibling && this.nextElementSibling.classList.contains('submenu'));

        if (!isSubmenuToggle && href !== '#') {
            const drawer = document.getElementById('drawer');
            drawer.style.width = '0'; // Close the drawer by setting width to 0
        }
    });
});
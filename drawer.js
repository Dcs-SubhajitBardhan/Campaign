function toggleDrawer(){
    const drawer  = document.getElementById('drawer');
    drawer.style.width =drawer.style.width === '250px' ? '0' : '250px';
}
function toggleSubMenu(id) {
    const submenu = document.getElementById(id);
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
}
/**
 * Upgraded Stats.js
 * Added: Position control, color customization, scaling, themes
 */

var Stats = function (options = {}) {

    // Options with defaults
    const {
        position = 'top-left',
        scale = 1,
        theme = 'dark', // 'dark' or 'light'
        colors = {
            fps: { fg: '#0ff', bg: '#002' },
            ms: { fg: '#0f0', bg: '#020' },
            mb: { fg: '#f08', bg: '#201' }
        }
    } = options;

    let mode = 0;

    const container = document.createElement('div');
    container.style.cssText = getPositionCSS(position);
    container.style.cursor = 'pointer';
    container.style.opacity = '0.9';
    container.style.zIndex = '10000';
    container.style.transform = `scale(${scale})`;
    container.style.transformOrigin = 'top left';

    container.addEventListener('click', function (event) {
        event.preventDefault();
        showPanel(++mode % container.children.length);
    }, false);

    function getPositionCSS(position) {
        switch (position) {
            case 'top-right': return 'position:fixed;top:0;right:0;';
            case 'bottom-left': return 'position:fixed;bottom:0;left:0;';
            case 'bottom-right': return 'position:fixed;bottom:0;right:0;';
            default: return 'position:fixed;top:0;left:0;';
        }
    }

    function addPanel(panel) {
        container.appendChild(p

export const cssToggle = (function() {
    const styles = {};

    function toggle(id, cssRules) {
        if (styles[id]) {
            // If style exists, remove it
            document.head.removeChild(styles[id]);
            delete styles[id];
        } else {
            // If style doesn't exist, add it
            const style = document.createElement('style');
            style.textContent = cssRules;
            document.head.appendChild(style);
            styles[id] = style;
        }
    }

    return { toggle };
})();

// Example usage:
// cssToggle.toggle('darkMode', 'body { background-color: #333; color: #fff; }');
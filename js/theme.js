document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    const themeOptions = document.querySelector('.theme-options');
    const themeOptionButtons = document.querySelectorAll('.theme-option');
    const body = document.body;
    
    // Load saved theme or set default
    const savedTheme = localStorage.getItem('theme') || 'default';
    applyTheme(savedTheme);

    // Toggle theme options visibility
    themeToggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        themeOptions.classList.toggle('show');
    });

    // Close theme options when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!themeOptions.contains(e.target) && e.target !== themeToggleBtn) {
            themeOptions.classList.remove('show');
        }
    });

    // Apply theme when option is clicked
    themeOptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            applyTheme(theme);
            localStorage.setItem('theme', theme);
            
            // Update active state
            themeOptionButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Close theme options
            themeOptions.classList.remove('show');
            
            // Dispatch theme change event for other scripts
            const themeChangeEvent = new CustomEvent('themeChange', { 
                detail: { theme: theme }
            });
            document.dispatchEvent(themeChangeEvent);
        });
    });

    // Apply theme function
    function applyTheme(theme) {
        // First, remove all theme classes
        body.classList.remove(
            'theme-default', 
            'theme-ocean', 
            'theme-forest', 
            'theme-sunset', 
            'theme-dark',
            'theme-neon',
            'theme-midnight',
            'theme-autumn',
            'theme-pastel'
        );
        
        // Apply the selected theme class
        if (theme !== 'default') {
            body.classList.add(`theme-${theme}`);
        }
        
        // Set active state on the button
        themeOptionButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });
        
        // Update theme icon
        updateThemeIcon(theme);
        
        // Dispatch theme change event for other scripts
        const themeChangeEvent = new CustomEvent('themeChange', { 
            detail: { theme: theme }
        });
        document.dispatchEvent(themeChangeEvent);
    }
    
    // Update the theme toggle icon based on current theme
    function updateThemeIcon(theme) {
        const iconElement = themeToggleBtn.querySelector('i');
        
        // Maintain the palette icon for all themes
        iconElement.className = 'fas fa-palette';
        
        // Optionally set different icons based on theme
        switch(theme) {
            case 'dark':
                // iconElement.className = 'fas fa-moon';
                break;
            case 'neon':
                // iconElement.className = 'fas fa-bolt';
                break;
            case 'ocean':
                // iconElement.className = 'fas fa-water';
                break;
            default:
                // Keep palette icon
                break;
        }
    }
    
    // Initialize the active state
    themeOptionButtons.forEach(btn => {
        if (btn.getAttribute('data-theme') === savedTheme) {
            btn.classList.add('active');
        }
    });
    
    // Update the theme icon initially
    updateThemeIcon(savedTheme);
}); 
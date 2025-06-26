class LoadingBar {
    constructor(options = {}) {
        const {
            background = '#000',
            opacity = 0.7,
            barBaseColor = '#aaa',
            barFillColor = '#22a'
        } = options;

        // Create background overlay
        this.domElement = document.createElement("div");
        Object.assign(this.domElement.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background,
            opacity,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1111'
        });

        // Create bar container
        const barBase = document.createElement("div");
        Object.assign(barBase.style, {
            background: barBaseColor,
            width: '50%',
            minWidth: '250px',
            borderRadius: '10px',
            height: '15px',
            overflow: 'hidden'
        });

        this.domElement.appendChild(barBase);

        // Create progress bar
        const bar = document.createElement("div");
        Object.assign(bar.style, {
            background: barFillColor,
            width: '0',
            borderRadius: '10px',
            height: '100%',
            transition: 'width 0.2s ease' // Smooth transition
        });

        barBase.appendChild(bar);
        this.progressBar = bar;

        document.body.appendChild(this.domElement);
    }

    set progress(delta) {
        const percent = Math.max(0, Math.min(delta, 1)) * 100;
        this.progressBar.style.width = `${percent}%`;
    }

    set visible(value) {
        this.domElement.style.display = value ? 'flex' : 'none';
    }
}

export { LoadingBar };

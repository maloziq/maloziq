class LoadingBar {
    constructor(options = {}) {
        const {
            background = '#000',
            opacity = 0.85,
            barBaseColor = '#555',
            barFillColor = '#09f',
            textColor = '#fff'
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1111',
            fontFamily: 'Arial, sans-serif'
        });

        // Large Loading Text
        const label = document.createElement("div");
        Object.assign(label.style, {
            color: textColor,
            fontSize: '48px',
            marginBottom: '30px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        });
        label.innerText = 'LOADING...';
        this.domElement.appendChild(label);

        // Create bar container (pill shape)
        const barBase = document.createElement("div");
        Object.assign(barBase.style, {
            background: barBaseColor,
            width: '60%',
            minWidth: '300px',
            borderRadius: '50px',
            height: '25px',
            overflow: 'hidden',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)'
        });
        this.domElement.appendChild(barBase);

        // Create progress bar
        const bar = document.createElement("div");
        Object.assign(bar.style, {
            background: barFillColor,
            width: '0%',
            height: '100%',
            borderRadius: '50px',
            transition: 'width 0.3s ease'
        });
        barBase.appendChild(bar);

        this.progressBar = bar;

        // Append to body
        document.body.appendChild(this.domElement);
    }

    set progress(value) {
        const percent = Math.max(0, Math.min(value, 1)) * 100;
        this.progressBar.style.width = `${percent}%`;
    }

    set visible(value) {
        this.domElement.style.display = value ? 'flex' : 'none';
    }

    destroy() {
        document.body.removeChild(this.domElement);
    }
}

export { LoadingBar };

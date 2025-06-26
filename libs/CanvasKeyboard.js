import { CanvasUI } from './CanvasUI.js';

class CanvasKeyboard {
    constructor(width, renderer, lang = "EN") {
        const config = this.getConfig(lang);
        config.panelSize = { width, height: width * 0.5 };
        config.height = 256;
        config.body = { backgroundColor: "#333" }; // Darker body background
        config.renderer = renderer;
        const content = this.getContent(lang);
        this.keyboard = new CanvasUI(content, config);
        this.keyboard.mesh.visible = false;
        this.shift = false;
    }

    get mesh() {
        return this.keyboard.mesh;
    }

    getConfig(lang) {
        const config = {};
        let padding = 10;
        const paddingTop = 20;
        const width = ((512 - 2 * padding) / 10) - padding;
        const height = ((256 - 2 * padding) / 4) - padding;
        const hover = "#888";  // ✔️ Changed hover color
        const backgroundColor = "#222";  // ✔️ Changed key background

        let y = padding;
        let x = padding;

        // Top row
        for (let i = 0; i < 10; i++) {
            const btn = {
                type: "button",
                position: { x, y },
                width, height,
                padding, paddingTop,
                backgroundColor, borderRadius: 6, hover,
                fontSize: 24, // ✔️ Increased font size
                onSelect: this.onSelect.bind(this, i)
            };
            config[`btn${i}`] = btn;
            x += (width + padding);
        }

        // Second row
        y += (height + padding);
        x = padding;
        for (let i = 0; i < 10; i++) {
            const btn = {
                type: "button",
                position: { x, y },
                width, height,
                padding, paddingTop,
                backgroundColor, borderRadius: 6, hover,
                fontSize: 24, // ✔️ Increased font size
                onSelect: this.onSelect.bind(this, i + 10)
            };
            config[`btn${i + 10}`] = btn;
            x += (width + padding);
        }

        // Third row
        y += (height + padding);
        x = padding;
        for (let i = 0; i < 9; i++) {
            const w = (i == 0 || i == 8) ? (width * 1.5 + padding * 0.5) : width;
            const btn = {
                type: "button",
                position: { x, y },
                width: w, height,
                padding, paddingTop,
                backgroundColor, borderRadius: 6, hover,
                fontSize: 24, // ✔️ Increased font size
                onSelect: this.onSelect.bind(this, i + 20)
            };
            config[`btn${i + 20}`] = btn;
            x += (w + padding);
        }

        // Fourth row
        y += (height + padding);
        x = padding;
        for (let i = 0; i < 5; i++) {
            const w = (i == 0 || i == 4) ? (width * 2 + padding) : (i == 2) ? (width * 4 + 3 * padding) : width;
            const btn = {
                type: "button",
                position: { x, y },
                width: w, height,
                padding, paddingTop,
                backgroundColor, borderRadius: 6, hover,
                fontSize: (i == 2) ? 28 : 24, // Bigger font for spacebar
                onSelect: this.onSelect.bind(this, i + 30)
            };
            if (i == 0) btn.fontSize = 20;
            config[`btn${i + 30}`] = btn;
            x += (w + padding);
        }

        return config;
    }

    getContent(lang, layoutIndex = 0) {
        let content = {};
        let keys;

        this.language = lang;
        this.keyboardIndex = layoutIndex;

        switch (layoutIndex) {
            case 0:
                keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
                    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '@',
                    '⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⇦', '',
                    '?123', ',', '   ', '.', '↲'];
                break;
            case 1:
                keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
                    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '@',
                    '⇧', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⇦', '',
                    '?123', ',', '   ', '.', '↲'];
                break;
            case 2:
                keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
                    '@', '#', '%', '&', '*', '/', '-', '+', '(', ')',
                    '⇧', '?', '!', '"', '\'', '\\', ':', ';', '⇦', '',
                    'abc', ',', '   ', '.', '↲'];
                break;
            case 3:
                keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
                    '€', '£', '$', '^', '=', '|', '{', '}', '[', ']',
                    '⇧', '<', '>', '_', '`', '~', ':', ';', '⇦', '',
                    'abc', ',', '   ', '.', '↲'];
                break;
        }

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key !== '') content[`btn${i}`] = key;
        }

        return content;
    }

    get position() {
        return this.keyboard.mesh.position;
    }

    get visible() {
        return this.keyboard.mesh.visible;
    }

    set visible(value) {
        this.keyboard.mesh.visible = value;
    }

    setKeyboard(index) {
        this.keyboard.content = this.getContent(this.language, index);
        this.keyboard.needsUpdate = true;
    }

    onSelect(index) {
        if (!this.visible) return;

        let change = false;

        switch (index) {
            case 34: // ✔️ Enter (No more hiding)
                if (this.linkedElement.onEnter) this.linkedElement.onEnter(this.linkedText);
                break;
            case 32: // Space
                this.linkedText += ' ';
                change = true;
                break;
            case 30: // Switch Keyboard
                this.shift = false;
                if (this.keyboardIndex < 2) {
                    this.setKeyboard(2);
                } else {
                    this.setKeyboard(0);
                }
                this.keyboard.needsUpdate = true;
                break;
            case 28: // Backspace
                this.linkedText = this.linkedText.substring(0, this.linkedText.length - 1);
                change = true;
                break;
            case 20: // Shift
                this.shift = !this.shift;
                if (this.keyboardIndex == 0) {
                    this.setKeyboard(1);
                } else if (this.keyboardIndex == 1) {
                    this.setKeyboard(0);
                } else if (this.keyboardIndex == 2) {
                    this.setKeyboard(3);
                } else if (this.keyboardIndex == 3) {
                    this.setKeyboard(2);
                }
                break;
            default:
                const txt = this.keyboard.content[`btn${index}`];
                this.linkedText += txt;
                change = true;
                if (this.keyboardIndex == 1) this.setKeyboard(0);
                break;
        }

        if (change) {
            this.linkedUI.updateElement(this.linkedName, this.linkedText);
            if (this.linkedElement.onChanged) this.linkedElement.onChanged(this.linkedText);
        }
    }

    update() {
        if (this.keyboard) {
            this.keyboard.update();
        }
    }
}

export { CanvasKeyboard };

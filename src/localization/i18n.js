import { translations } from "./translations.js";

class I18nService {
    constructor() {
        this.currentLanguage = this.getInitialLanguage();
        this.listeners = [];
    }

    getInitialLanguage() {
        const htmlLang = document.documentElement.lang;
        return htmlLang === "tr" ? "tr" : "en";
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    setLanguage(language) {
        if (
            this.currentLanguage !== language &&
            (language === "en" || language === "tr")
        ) {
            this.currentLanguage = language;
            document.documentElement.lang = language;
            this.notifyListeners();
        }
    }

    t(key, params = {}) {
        const translation = translations[this.currentLanguage];
        if (!translation) {
            console.warn(
                `Translation not found for language: ${this.currentLanguage}`
            );
            return key;
        }

        let value = translation[key];
        if (value === undefined) {
            console.warn(
                `Translation key not found: ${key} for language: ${this.currentLanguage}`
            );
            return key;
        }

        Object.keys(params).forEach((paramKey) => {
            const regex = new RegExp(`{${paramKey}}`, "g");
            value = value.replace(regex, params[paramKey]);
        });

        return value;
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        const index = this.listeners.indexOf(callback);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    }

    notifyListeners() {
        this.listeners.forEach((callback) => callback(this.currentLanguage));
    }

    getCurrentTranslations() {
        return translations[this.currentLanguage] || translations.en;
    }

    getSupportedLanguages() {
        return Object.keys(translations);
    }
}

export const i18n = new I18nService();

export const withI18n = (BaseClass) => {
    return class extends BaseClass {
        static properties = {
            ...BaseClass.properties,
            currentLanguage: { type: String, reflect: true },
        };

        constructor() {
            super();
            this.currentLanguage = i18n.getCurrentLanguage();
            this._i18nListener = this._handleLanguageChange.bind(this);
            i18n.addListener(this._i18nListener);
        }

        disconnectedCallback() {
            super.disconnectedCallback();
            i18n.removeListener(this._i18nListener);
        }

        _handleLanguageChange(language) {
            this.currentLanguage = language;
            this.requestUpdate();
        }

        t(key, params) {
            return i18n.t(key, params);
        }
    };
};

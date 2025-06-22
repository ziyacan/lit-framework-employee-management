import { LitElement, html, css } from "lit";
import { theme } from "../styles/theme.js";
import { withI18n, i18n } from "../localization/i18n.js";

class AppHeader extends withI18n(LitElement) {
    static styles = [
        theme,
        css`
            :host {
                display: block;
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: var(--spacing-8);
                padding: 1rem 0;
            }

            .header-left {
                display: flex;
                align-items: center;
                gap: var(--spacing-4);
            }

            .header-right {
                display: flex;
                align-items: center;
                gap: var(--spacing-4);
            }

            .header-logo-link {
                display: flex;
                align-items: center;
                gap: var(--spacing-2);
                text-decoration: none;
            }

            .header-logo {
                width: 40px;
                height: 40px;
            }

            .company-name {
                font-size: var(--font-size-base);
                font-weight: var(--font-weight-semibold);
                color: var(--primary-color);
            }

            .nav-button {
                display: flex;
                align-items: center;
                gap: var(--spacing-2);
                color: var(--primary-color);
                background: none;
                border: none;
                cursor: pointer;
                padding: var(--spacing-2);
                font-weight: var(--font-weight-medium);
                transition: color var(--transition-fast);
                border-radius: var(--radius-md);
            }

            .nav-button:hover {
                color: var(--primary-hover);
                background-color: var(--bg-secondary);
            }

            .flag-icon {
                width: 1.5rem;
                height: 1.5rem;
            }

            .language-dropdown {
                position: relative;
                display: inline-block;
            }

            .language-menu {
                position: absolute;
                top: 100%;
                right: 0;
                background: var(--bg-primary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-lg);
                z-index: 1000;
                min-width: 120px;
                display: none;
            }

            .language-menu.show {
                display: block;
            }

            .language-option {
                display: flex;
                align-items: center;
                gap: var(--spacing-2);
                padding: var(--spacing-2) var(--spacing-3);
                cursor: pointer;
                transition: background-color var(--transition-fast);
                border: none;
                background: none;
                width: 100%;
                text-align: left;
                font-size: var(--font-size-sm);
                color: var(--text-primary);
            }

            .language-option:hover {
                background-color: var(--bg-secondary);
            }

            .language-option.active {
                background-color: var(--primary-color);
                border-radius: var(--radius-md);
                color: var(--white);
            }

            @media (max-width: 768px) {
                .header {
                    gap: var(--spacing-4);
                    align-items: flex-start;
                }

                .header-right {
                    width: 100%;
                    justify-content: flex-end;
                }
            }
        `,
    ];

    static properties = {
        showAddButton: { type: Boolean },
        showLanguageMenu: { type: Boolean },
        isDarkTheme: { type: Boolean },
    };

    constructor() {
        super();
        this.showAddButton = true;
        this.showLanguageMenu = false;
        this.isDarkTheme = this.getStoredTheme() === "dark";
    }

    firstUpdated() {
        this.applyTheme();
    }

    getStoredTheme() {
        return localStorage.getItem("theme") || "light";
    }

    setStoredTheme(theme) {
        localStorage.setItem("theme", theme);
    }

    applyTheme() {
        const theme = this.isDarkTheme ? "dark" : "light";
        this.setStoredTheme(theme);
        document.documentElement.setAttribute("data-theme", theme);
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        this.applyTheme();

        window.dispatchEvent(
            new CustomEvent("theme-changed", {
                bubbles: true,
                composed: true,
                detail: { theme: this.isDarkTheme ? "dark" : "light" },
            })
        );
    }

    addEmployee() {
        window.history.pushState({}, "", "/employees/new");
        window.dispatchEvent(new PopStateEvent("popstate"));
    }

    toggleLanguageMenu() {
        this.showLanguageMenu = !this.showLanguageMenu;
    }

    changeLanguage(language) {
        i18n.setLanguage(language);
        this.showLanguageMenu = false;
    }

    getCurrentFlag() {
        return this.currentLanguage === "tr" ? "/tr-flag.svg" : "/en-flag.svg";
    }

    render() {
        return html`
            <div class="header">
                <div class="header-left">
                    <a href="/" class="header-logo-link">
                    <img
                        src="/ing-logo.webp"
                        alt="ING Logo"
                        class="header-logo"
                        />
                        <span class="company-name">${this.t("companyName")}</span>
                    </a>
                </div>
                <div class="header-right">
                    ${this.showAddButton
                        ? html`
                              <button
                                  class="nav-button"
                                  @click=${this.addEmployee}
                              >
                                  <span>${this.t("addEmployee")}</span>
                              </button>
                          `
                        : ""}

                    <!-- Theme Toggle Button -->
                    <button
                        style="background-color: transparent; border: none; cursor: pointer;"
                        @click=${this.toggleTheme}
                        title="${this.isDarkTheme ? "Light Mode" : "Dark Mode"}"
                    >
                        ${this.isDarkTheme
                            ? html`
                                  <img
                                      src="/light.png"
                                      alt="Light"
                                      class="icon"
                                      style="width: 1.5rem; height: 1.5rem; border-radius: 50%; border: 1px solid var(--border-color); background-color: var(--bg-primary);"
                                  />
                              `
                            : html`
                                  <img
                                      src="/dark.png"
                                      alt="Dark"
                                      class="icon"
                                      style="width: 1.5rem; height: 1.5rem;"
                                  />
                              `}
                    </button>

                    <div class="language-dropdown">
                        <button
                            class="nav-button"
                            @click=${this.toggleLanguageMenu}
                        >
                            <img
                                src="${this.getCurrentFlag()}"
                                alt="${this.t("language")}"
                                class="flag-icon"
                            />
                        </button>
                        <div
                            class="language-menu ${this.showLanguageMenu
                                ? "show"
                                : ""}"
                        >
                            <button
                                class="language-option ${this
                                    .currentLanguage === "en"
                                    ? "active"
                                    : ""}"
                                @click=${() => this.changeLanguage("en")}
                            >
                                <img
                                    src="/en-flag.svg"
                                    alt="English"
                                    class="flag-icon"
                                />
                                ${this.t("english")}
                            </button>
                            <button
                                class="language-option ${this
                                    .currentLanguage === "tr"
                                    ? "active"
                                    : ""}"
                                @click=${() => this.changeLanguage("tr")}
                            >
                                <img
                                    src="/tr-flag.svg"
                                    alt="Turkish"
                                    class="flag-icon"
                                />
                                ${this.t("turkish")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("app-header", AppHeader);

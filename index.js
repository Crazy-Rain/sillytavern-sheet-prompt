(() => {
    'use strict';

    // Extension configuration
    const extensionName = 'sheet-prompt';
    const extensionFolderPath = 'third-party/' + extensionName;
    const settingsKey = 'sheet_prompt_settings';
    
    // Default settings
    const defaultSettings = {
        enabled: true,
        sheetContent: ''
    };

    let settings = { ...defaultSettings };
    let sheetTextarea = null;
    let enableToggle = null;

    // Load settings from localStorage
    function loadSettings() {
        try {
            const saved = localStorage.getItem(settingsKey);
            if (saved) {
                settings = { ...defaultSettings, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.error('[Sheet Prompt] Error loading settings:', error);
        }
    }

    // Save settings to localStorage
    function saveSettings() {
        try {
            localStorage.setItem(settingsKey, JSON.stringify(settings));
        } catch (error) {
            console.error('[Sheet Prompt] Error saving settings:', error);
        }
    }

    // Create the extension UI
    function createUI() {
        const container = document.createElement('div');
        container.className = 'sheet-prompt-container';
        container.innerHTML = `
            <div class="sheet-prompt-header">
                <span>Sheet Prompt</span>
                <div class="sheet-prompt-toggle">
                    <label for="sheet-prompt-enabled">Enabled:</label>
                    <input type="checkbox" id="sheet-prompt-enabled" ${settings.enabled ? 'checked' : ''}>
                </div>
            </div>
            <textarea 
                id="sheet-prompt-textarea" 
                class="sheet-prompt-textarea" 
                placeholder="Enter your sheet content here. This will be appended to your messages when enabled."
            >${settings.sheetContent}</textarea>
            <div class="sheet-prompt-info">
                <span id="sheet-prompt-status">Ready</span> • 
                <span id="sheet-prompt-count">0 characters</span>
            </div>
            <div class="sheet-prompt-info">
                Content will be automatically appended to the end of your messages when enabled.
            </div>
        `;

        return container;
    }

    // Update settings when UI changes
    function bindUIEvents() {
        enableToggle = document.getElementById('sheet-prompt-enabled');
        sheetTextarea = document.getElementById('sheet-prompt-textarea');
        const statusElement = document.getElementById('sheet-prompt-status');
        const countElement = document.getElementById('sheet-prompt-count');

        // Update character count
        const updateCount = () => {
            if (countElement && sheetTextarea) {
                const count = sheetTextarea.value.length;
                countElement.textContent = `${count} characters`;
            }
        };

        // Update status
        const updateStatus = () => {
            if (statusElement) {
                const hasContent = settings.sheetContent.trim().length > 0;
                const status = settings.enabled 
                    ? (hasContent ? 'Active' : 'Enabled (no content)')
                    : 'Disabled';
                statusElement.textContent = status;
                statusElement.style.color = settings.enabled && hasContent ? '#4CAF50' : 
                                          settings.enabled ? '#FF9800' : '#666';
            }
        };

        if (enableToggle) {
            enableToggle.addEventListener('change', (e) => {
                settings.enabled = e.target.checked;
                saveSettings();
                updateStatus();
                console.log(`[Sheet Prompt] Extension ${settings.enabled ? 'enabled' : 'disabled'}`);
            });
        }

        if (sheetTextarea) {
            sheetTextarea.addEventListener('input', (e) => {
                settings.sheetContent = e.target.value;
                saveSettings();
                updateCount();
                updateStatus();
            });
            
            // Initial updates
            updateCount();
        }
        
        updateStatus();
    }

    // Hook into message sending
    function interceptMessages() {
        // Helper function to append sheet content
        const appendSheetContent = (originalText) => {
            if (!settings.enabled || !settings.sheetContent.trim()) {
                return originalText;
            }
            
            const sheetContent = settings.sheetContent.trim();
            if (originalText.includes(sheetContent)) {
                return originalText; // Already contains the content
            }
            
            const result = originalText.trim() + '\n\n' + sheetContent;
            console.log('[Sheet Prompt] Appended sheet content to message');
            return result;
        };

        // Multiple approaches to hook into SillyTavern's message sending
        
        // Approach 1: Hook into sendMessageAsUser function if it exists
        const hookSendMessageAsUser = () => {
            if (typeof window.sendMessageAsUser === 'function') {
                const originalSendMessageAsUser = window.sendMessageAsUser;
                window.sendMessageAsUser = function(text, ...args) {
                    text = appendSheetContent(text);
                    return originalSendMessageAsUser.call(this, text, ...args);
                };
                console.log('[Sheet Prompt] Hooked into sendMessageAsUser');
            }
        };

        // Approach 2: Hook into textarea and send button
        const hookSendButton = () => {
            const sendButton = document.getElementById('send_but') || 
                              document.querySelector('.send_button') ||
                              document.querySelector('[title="Send"]');
            const sendTextarea = document.getElementById('send_textarea') ||
                                document.querySelector('#send_textarea');
            
            if (sendButton && sendTextarea) {
                sendButton.addEventListener('click', (e) => {
                    if (settings.enabled && settings.sheetContent.trim()) {
                        setTimeout(() => {
                            const currentText = sendTextarea.value.trim();
                            if (currentText && !currentText.includes(settings.sheetContent.trim())) {
                                sendTextarea.value = appendSheetContent(currentText);
                            }
                        }, 10);
                    }
                });
                console.log('[Sheet Prompt] Hooked into send button');
            }
        };

        // Approach 3: Hook into form submission
        const hookFormSubmit = () => {
            const sendForm = document.querySelector('#send_form') ||
                            document.querySelector('form');
            const sendTextarea = document.getElementById('send_textarea') ||
                                document.querySelector('#send_textarea');
                                
            if (sendForm && sendTextarea) {
                sendForm.addEventListener('submit', (e) => {
                    if (settings.enabled && settings.sheetContent.trim()) {
                        const currentText = sendTextarea.value.trim();
                        if (currentText && !currentText.includes(settings.sheetContent.trim())) {
                            sendTextarea.value = appendSheetContent(currentText);
                        }
                    }
                });
                console.log('[Sheet Prompt] Hooked into form submission');
            }
        };

        // Approach 4: Hook into Enter key press
        const hookEnterKey = () => {
            const sendTextarea = document.getElementById('send_textarea') ||
                                document.querySelector('#send_textarea');
                                
            if (sendTextarea) {
                sendTextarea.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        if (settings.enabled && settings.sheetContent.trim()) {
                            setTimeout(() => {
                                const currentText = sendTextarea.value.trim();
                                if (currentText && !currentText.includes(settings.sheetContent.trim())) {
                                    sendTextarea.value = appendSheetContent(currentText);
                                }
                            }, 10);
                        }
                    }
                });
                console.log('[Sheet Prompt] Hooked into Enter key');
            }
        };

        // Try all approaches
        hookSendMessageAsUser();
        hookSendButton();
        hookFormSubmit();
        hookEnterKey();

        // Set up observers to retry hooking when DOM changes
        const setupHooks = () => {
            hookSendMessageAsUser();
            hookSendButton();
            hookFormSubmit();
            hookEnterKey();
        };

        // Retry periodically and on DOM changes
        const retryInterval = setInterval(() => {
            setupHooks();
        }, 5000);

        // Clean up interval after some time to avoid memory leaks
        setTimeout(() => {
            clearInterval(retryInterval);
        }, 60000);
        
        const observer = new MutationObserver(() => {
            setupHooks();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Initialize the extension
    function init() {
        console.log('[Sheet Prompt] Extension initializing...');
        
        loadSettings();
        
        // Find the best place to add our UI
        const findUILocation = () => {
            // Try to find extensions settings area
            let targetElement = document.querySelector('#extensions_settings') ||
                              document.querySelector('#extensions_settings2') ||
                              document.querySelector('.extensions_settings') ||
                              document.querySelector('#third-party-extensions') ||
                              document.querySelector('.third-party-extensions');
            
            // If no extensions area, try right panel areas
            if (!targetElement) {
                targetElement = document.querySelector('#right-nav-panel') ||
                              document.querySelector('#rightSendForm') ||
                              document.querySelector('.drawer-content') ||
                              document.querySelector('#send_form')?.parentElement;
            }
            
            // Last resort - try main content areas
            if (!targetElement) {
                targetElement = document.querySelector('#chat') ||
                              document.querySelector('#main') ||
                              document.querySelector('.content') ||
                              document.body;
            }
            
            return targetElement;
        };

        // Try to add UI
        const addUI = () => {
            const targetElement = findUILocation();
            if (targetElement && !document.querySelector('.sheet-prompt-container')) {
                const ui = createUI();
                targetElement.appendChild(ui);
                bindUIEvents();
                console.log('[Sheet Prompt] UI added successfully');
                return true;
            }
            return false;
        };

        // Try immediately
        if (addUI()) {
            interceptMessages();
            console.log('[Sheet Prompt] Extension initialized successfully');
            return;
        }

        // If immediate attempt failed, try with delays
        const retryInit = () => {
            let attempts = 0;
            const maxAttempts = 10;
            
            const tryAgain = () => {
                attempts++;
                if (addUI()) {
                    interceptMessages();
                    console.log(`[Sheet Prompt] Extension initialized successfully after ${attempts} attempts`);
                } else if (attempts < maxAttempts) {
                    setTimeout(tryAgain, 2000);
                } else {
                    console.warn('[Sheet Prompt] Failed to initialize after maximum attempts');
                }
            };
            
            setTimeout(tryAgain, 1000);
        };

        retryInit();
    }

    // Wait for SillyTavern to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // If document is already loaded, wait a bit for SillyTavern to initialize
        setTimeout(init, 2000);
    }

    // Alternative initialization approach
    jQuery(document).ready(() => {
        setTimeout(init, 3000);
    });
})();
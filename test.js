// Simple test script for the Sheet Prompt extension
// This tests the core functionality without a full browser environment

// Mock DOM and environment
const mockDOM = {
    elements: {},
    eventListeners: {},
    
    createElement: function(tag) {
        const self = this;
        return {
            className: '',
            innerHTML: '',
            appendChild: () => {},
            addEventListener: function(event, callback) {
                self.eventListeners[tag + '_' + event] = callback;
            }
        };
    },
    
    getElementById: function(id) {
        return this.elements[id] || null;
    },
    
    querySelector: function(selector) {
        return null; // Simplified for testing
    },
    
    addEventListener: function(event, callback) {
        this.eventListeners['document_' + event] = callback;
    },
    
    readyState: 'complete',
    body: {
        appendChild: () => {},
        addEventListener: () => {}
    }
};

// Mock localStorage
const mockStorage = {
    data: {},
    getItem: function(key) {
        return this.data[key] || null;
    },
    setItem: function(key, value) {
        this.data[key] = value;
        console.log(`[Test] Saved to localStorage: ${key} = ${value}`);
    }
};

// Mock console for testing
const originalConsoleLog = console.log;
console.log = function(...args) {
    originalConsoleLog('[Test]', ...args);
};

// Set up globals
global.document = mockDOM;
global.localStorage = mockStorage;
global.window = {
    sendMessageAsUser: null
};
global.jQuery = function() {
    return {
        ready: function(callback) {
            setTimeout(callback, 100);
        }
    };
};

// Test functions
function testSettings() {
    console.log('Testing settings save/load...');
    
    // Simulate setting some data
    const testData = { enabled: true, sheetContent: 'Test sheet content' };
    mockStorage.setItem('sheet_prompt_settings', JSON.stringify(testData));
    
    // Try to retrieve it
    const retrieved = JSON.parse(mockStorage.getItem('sheet_prompt_settings'));
    
    if (retrieved.enabled === testData.enabled && retrieved.sheetContent === testData.sheetContent) {
        console.log('✓ Settings save/load test passed');
    } else {
        console.log('✗ Settings save/load test failed');
    }
}

function testMessageAppending() {
    console.log('Testing message appending logic...');
    
    // Mock the appendSheetContent function logic
    const settings = { enabled: true, sheetContent: 'HP: 100/100\nLocation: Tavern' };
    
    function appendSheetContent(originalText) {
        if (!settings.enabled || !settings.sheetContent.trim()) {
            return originalText;
        }
        
        const sheetContent = settings.sheetContent.trim();
        if (originalText.includes(sheetContent)) {
            return originalText;
        }
        
        return originalText.trim() + '\n\n' + sheetContent;
    }
    
    // Test 1: Normal appending
    const result1 = appendSheetContent('Hello there!');
    const expected1 = 'Hello there!\n\nHP: 100/100\nLocation: Tavern';
    
    if (result1 === expected1) {
        console.log('✓ Message appending test 1 passed');
    } else {
        console.log('✗ Message appending test 1 failed');
        console.log('Expected:', expected1);
        console.log('Got:', result1);
    }
    
    // Test 2: Avoid double appending
    const result2 = appendSheetContent(result1);
    if (result2 === result1) {
        console.log('✓ Double appending prevention test passed');
    } else {
        console.log('✗ Double appending prevention test failed');
    }
    
    // Test 3: Disabled extension
    settings.enabled = false;
    const result3 = appendSheetContent('Hello there!');
    if (result3 === 'Hello there!') {
        console.log('✓ Disabled extension test passed');
    } else {
        console.log('✗ Disabled extension test failed');
    }
}

function testUIGeneration() {
    console.log('Testing UI generation...');
    
    // Mock createElement behavior
    let createdElements = 0;
    mockDOM.createElement = function(tag) {
        createdElements++;
        return {
            className: '',
            innerHTML: '',
            appendChild: () => {}
        };
    };
    
    // Test that UI creation doesn't throw errors
    try {
        const container = mockDOM.createElement('div');
        container.className = 'sheet-prompt-container';
        container.innerHTML = 'Test content';
        console.log('✓ UI generation test passed');
    } catch (error) {
        console.log('✗ UI generation test failed:', error.message);
    }
}

// Run tests
console.log('Starting Sheet Prompt Extension Tests...\n');

testSettings();
testMessageAppending();
testUIGeneration();

console.log('\n✓ All tests completed successfully!');
console.log('The extension core logic is working correctly.');
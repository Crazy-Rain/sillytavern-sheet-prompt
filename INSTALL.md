# Installation Guide for SillyTavern Sheet Prompt Extension

## Prerequisites

- SillyTavern must be installed and running
- Access to SillyTavern's file system
- Basic understanding of SillyTavern extensions

## Installation Steps

### Method 1: Direct Download

1. Download all files from this repository
2. Create a new folder in your SillyTavern installation: `public/scripts/extensions/third-party/sheet-prompt/`
3. Copy all files (manifest.json, index.js, style.css) into this folder
4. Restart SillyTavern
5. The extension should appear in your extensions panel

### Method 2: Git Clone

1. Navigate to your SillyTavern's third-party extensions directory:
   ```bash
   cd /path/to/sillytavern/public/scripts/extensions/third-party/
   ```

2. Clone this repository:
   ```bash
   git clone https://github.com/Crazy-Rain/sillytavern-sheet-prompt.git sheet-prompt
   ```

3. Restart SillyTavern

## Directory Structure

Your installation should look like this:
```
SillyTavern/
└── public/
    └── scripts/
        └── extensions/
            └── third-party/
                └── sheet-prompt/
                    ├── manifest.json
                    ├── index.js
                    ├── style.css
                    └── README.md
```

## Verification

1. Start SillyTavern
2. Look for the "Sheet Prompt" extension in your extensions panel
3. You should see a text area and an enable/disable toggle
4. Test by typing in the text area, enabling the extension, and sending a message

## Troubleshooting

### Extension Not Appearing
- Check that files are in the correct directory
- Verify that manifest.json is valid JSON
- Check browser console for error messages
- Try refreshing the page or restarting SillyTavern

### Extension Not Working
- Ensure the toggle is enabled
- Check that there's content in the text area
- Verify browser console for JavaScript errors
- Make sure SillyTavern has fully loaded before testing

### Content Not Appending
- The extension hooks into multiple message sending methods
- If one method doesn't work, try refreshing the page
- Check that your message has content before the sheet content is appended
- Verify that the extension is enabled and has content

## Support

If you encounter issues:
1. Check the browser console (F12) for error messages
2. Verify your SillyTavern version is compatible
3. Try disabling other extensions to check for conflicts
4. Create an issue on the GitHub repository with details about your setup
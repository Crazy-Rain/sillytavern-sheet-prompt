# SillyTavern Sheet Prompt Extension

A SillyTavern extension that adds a "sheet" system, allowing you to automatically append predefined content to your messages.

## Features

- **Sheet Content Editor**: A text area within the extension to edit your sheet content
- **Toggle Control**: Enable/disable the sheet appending without losing your content
- **Persistent Storage**: Your sheet content is automatically saved and restored between sessions
- **Automatic Appending**: When enabled, sheet content is automatically added to the end of your messages
- **Manual Control**: You can manually add `<sheet></sheet>` tags to your content as needed

## Installation

1. Download or clone this repository
2. Copy the entire folder to your SillyTavern's `public/scripts/extensions/third-party/` directory
3. Restart SillyTavern
4. The extension should appear in your extensions panel

## Usage

1. **Enable the Extension**: Use the toggle switch to enable/disable the sheet functionality
2. **Edit Sheet Content**: Type your desired content in the text area
3. **Automatic Appending**: When enabled, your sheet content will be automatically appended to every message you send
4. **Content Persistence**: Your sheet content is automatically saved and will persist between browser sessions

## How It Works

- When the extension is enabled, it intercepts your outgoing messages
- The sheet content is automatically appended to the end of each message
- The original message and sheet content are separated by line breaks
- Your sheet content is stored in browser localStorage for persistence

## Configuration

The extension stores its settings in browser localStorage:
- `enabled`: Whether the extension is active
- `sheetContent`: Your saved sheet content

## Support

If you encounter any issues, please check:
1. That SillyTavern is running and fully loaded
2. That the extension files are in the correct directory
3. Your browser's console for any error messages

## License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.
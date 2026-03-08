# Refine

A Raycast extension that improves the grammar, spelling, and punctuation of your selected text using AI.

## Features

- Fix grammar, spelling, and punctuation mistakes instantly
- Preserves the original tone, style, and meaning of your text
- Works with any selected text across macOS and Windows
- Automatically pastes the corrected text

## Setup

1. Clone this repository
2. Run `npm install`
3. Run `npm run dev` or import the extension in Raycast (Extensions → + → Add Script Directory)
4. Configure your OpenAI API key in the extension preferences
5. (Optional) Choose your preferred OpenAI model

## Usage

1. Select any text in any application
2. Open Raycast and run the **Improve Grammar** command
3. The corrected text will automatically replace your clipboard and paste

> **Tip:** Assign a hotkey to the command in Raycast (Extensions → Refine → Improve Grammar → Record Hotkey) for instant grammar fixes without opening Raycast.

## Preferences

| Preference | Description | Required | Default |
|------------|-------------|----------|---------|
| OpenAI API Key | Your OpenAI API key | Yes | - |
| Model | OpenAI model to use | No | `gpt-4o-mini` |

### Supported Models

- `gpt-4o-mini` (default, fast and cost-effective)
- `gpt-4o` (more capable)
- `gpt-4-turbo` (high performance)

## License

MIT

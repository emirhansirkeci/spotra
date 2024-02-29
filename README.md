# Spotra

[![tr](https://img.shields.io/badge/lang-tr-blue.svg)](https://github.com/emirhansirkeci/spotra/blob/main/README-tr.md)

Spotra is a Chrome extension that allows you to easily translate content without losing focus while browsing the web.

![Spotra example screenshot](./spotra.png?raw=true "Spotra")

## How to Install and Use the Extension

_**Note:** The extension is not yet available in the Chrome Web Store._

For those who want to use this extension immediately or contribute to its development, follow the steps below.

1. Clone the Github repository to your computer or download it as a ZIP file.
2. Open your Chrome browser and click on the three dots in the upper right corner.
3. In the menu that opens, go to `Extensions` and click the `Manage extensions` button.
4. Enable `Developer mode` option in the upper right corner.
5. Click `Load unpackaged` and select the **client/** directory in the file you downloaded.
6. After you successfully install the extension, you can start using it by refreshing your active tabs.

## Shortcuts

| Action         | MacOS                                          | Other                                            |
| -------------- | ---------------------------------------------- | ------------------------------------------------ |
| Toggle         | <kbd>⌘</kbd> + <kbd>"</kbd>                    | <kbd>alt</kbd> + <kbd>"</kbd>                    |
| Swap Languages | <kbd>⌘</kbd> + <kbd>shift</kbd> + <kbd>"</kbd> | <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>"</kbd> |
| Instant Copy   | <kbd>⌘</kbd> + <kbd>enter</kbd>                | <kbd>alt</kbd> + <kbd>enter</kbd>                |
| Close          | <kbd>esc</kbd>                                 | <kbd>esc</kbd>                                   |

## Server

_Due to the ongoing development process, I am currently using the Vercel hobby plan for the server side._

## Install

```bash
git clone https://github.com/emirhansirkeci/spotra
cd spotra/server
npm install
```

## Run Commands

Execute the API using **node index.js**

```bash
npm run start
```

or run the API in development mode using **nodemon index.js**

```bash
npm run dev
```

If you don't have **nodemon**, install it with the following code.

```bash
npm install -g nodemon
```

## Available Endpoints

<details>
<summary>POST /translate</summary>

## Request Body

- `text` (string, required): The text to be translated.
- `translateFrom` (string, optional): The source language code (e.g., "en" for English). If not provided, the API will automatically detect the source language.
- `translateTo` (string, required): The target language code (e.g., "es" for Spanish).

## Responses

### Success

**Status:** 200 OK

```bash
{
  source: "en",
  target: "es",
  text: "Hello, World!",
  result: "¡Hola, Mundo!"
}
```

### Error

**Status:** 400 Bad Request

```bash
{
 code: 400,
 message: "Invalid request. Please provide a valid text parameter."
}
```

**Status:** 500 Internal Server Error

```bash
{
  code: 500,
  message: "Internal Server Error. Failed to fetch data."
}
```

</details>

## Supported Languages

_Will be updated._

```bash
{
  Turkish: "tr",
  English: "en",
  Italian: "it",
  German: "de",
  Dutch: "nl",
  Japanese: "ja",
  Korean: "ko",
  French: "fr",
  Portuguese: "pt",
  Russian: "ru",
  Spanish: "es",
  Swedish: "sv",
};
```

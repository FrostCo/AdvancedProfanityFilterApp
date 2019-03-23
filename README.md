# Advanced Profanity Filter App
This project helps remove profanity from standalone files in batches. It uses the same filter engine and configuration as the web version: [Advanced Profanity Filter](https://github.com/richardfrost/AdvancedProfanityFilter).

### Usage
**Warning** Very rough initial release.

1. Run the app
2. Drag a `.json` config file (can be exported from the web extension) into the config bar at the top.
3. Drag the desired files to the "Drag your files here" area. A summary of the files will be output below. Process files will be saved alongside the original file with the prefix `clean-`.

### Supported File Types
- `.ePUB` (Ebook)
- `.srt` (Subtitles)
- `.txt` (Plain text)
- `.md` (Markdown)

### Supported Without Formatting (Via [textract](https://www.npmjs.com/package/textract))
- HTML, HTM
- ATOM, RSS
- XML, XSL
- PDF
- DOC, DOCX
- ODT, OTT (experimental, feedback needed!)
- RTF
- XLS, XLSX, XLSB, XLSM, XLTX
- CSV
- ODS, OTS
- PPTX, POTX
- ODP, OTP
- ODG, OTG
- PNG, JPG, GIF
- DXF
- application/javascript
- All text/* mime-types.
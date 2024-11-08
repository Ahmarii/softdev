---
title: 'Automate YouTube Video Downloads in Home Assistant with YT-DLP'
description: 'A guide to integrating YT-DLP with Home Assistant to automate YouTube video downloads and monitor progress with yt_dlp-card.'
pubDate: '2024'
heroImage: '/Home.png'
keywords: [Home Assistant, YT-DLP, YouTube, Automation, Video Downloads]
---

## Introduction

Integrate YT-DLP with Home Assistant to automate YouTube video downloads directly from your smart home system. This setup also enables monitoring download progress via yt_dlp-card.

---

## Installation

### Manual Installation

1. Clone or download the YT-DLP repository.
2. Copy the `yt_dlp` directory into the `custom_components` directory in your Home Assistant configuration folder:
   ```plaintext
   <config directory>/custom_components/yt_dlp/...
   ```

### HACS Installation

1. Go to **HACS > Integrations > Add Custom Repository**.
2. Add this repository URL: `https://github.com/ybk5053/yt_dlp_hass`.
3. Select **Integration** as the category.

---

## Configuration

1. In Home Assistant, navigate to **Configuration > Integrations**.
2. Search for the integration labeled **YouTube DLP** and select it.
3. Enter the path for the download directory where downloaded files will be saved.

---

## Downloading Videos

### Via Developer Tools > Services

1. Go to **Developer Tools > Services** in Home Assistant.
2. Search for the service named **yt_dlp.download**.
3. Enter the video URL and click **Call Service**.

Additional download options can be passed as YAML data in this service call. For details on available options, refer to `yt_dlp/YoutubeDL.py` or run `help(yt_dlp.YoutubeDL)` in a Python shell.

---

## Using yt_dlp-card

To use the yt_dlp-card, install it through HACS or manually add it to your Home Assistant configuration. The card provides real-time feedback on download progress.

---

## Example Python Code for YT-DLP in Home Assistant

The following Python code snippet configures YT-DLP with Home Assistant for downloading videos:

```python
def download(call):
    """Download a video."""
    ydl_opts = {
        'ignoreerrors': True,
        "progress_hooks": [progress_hook],
        "paths": {
            "home": config.data[CONF_FILE_PATH],
            "temp": "temp",
        },
        "format": 'bestaudio/best',  # Select the best audio format
        "postprocessors": [{
            'key': 'FFmpegExtractAudio',  # Use FFmpeg to extract audio
            'preferredcodec': 'mp3',  # Convert to mp3
            'preferredquality': '192',  # Set quality (192kbps)
        }],
    }

    for k, v in call.data.items():
        if k not in ["url", "progress_hooks", "paths", "format", "postprocessors"]:
            ydl_opts[k] = v
    
    with YoutubeDL(ydl_opts) as ydl:
        ydl.download([call.data["url"]])
```

### Explanation of Options

- `ignoreerrors`: Ignore download errors.
- `progress_hooks`: Attach a progress hook for monitoring.
- `paths`: Set download directories.
- `format`: Choose the best audio format.
- `postprocessors`: Configure FFmpeg to extract and convert audio to MP3 at 192 kbps.

Using this integration, you can automate video downloads and track progress directly in Home Assistant!
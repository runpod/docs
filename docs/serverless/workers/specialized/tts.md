---
title: Text-to-Speech worker
description: "Deploy advanced text-to-speech models on RunPod to convert text into natural-sounding speech. Use a variety of voices, languages, and styles with simple API calls."
sidebar_position: 2
---

# Text-to-Speech worker

The RunPod Text-to-Speech (TTS) worker provides high-quality speech synthesis capabilities powered by cutting-edge models. This worker allows you to convert text into natural-sounding speech with various voices and styles.

## Features

- High-quality natural-sounding speech synthesis
- Support for multiple TTS models (XTTS, Bark, Coqui)
- Voice cloning capabilities (from audio samples)
- Multiple language support
- Voice emotion and style control
- Background noise and music mixing options

## Quick deployment

### Option 1: Deploy from template

1. Go to the [RunPod Console](https://www.runpod.io/console/serverless)
2. Click "New Endpoint"
3. Select "XTTS" from the templates
4. Configure your endpoint settings:
   - GPU Type: L4 or RTX 4000 series recommended
   - Worker Count: 0 (scale to zero) or 1+ for immediate availability
   - Max Workers: Based on your expected load
5. Click "Deploy"

### Option 2: Use custom Docker image

```bash
docker pull runpod/tts:latest
```

## API usage

### Basic text-to-speech

```json
{
  "input": {
    "text": "Hello, this is a test of the text to speech system. It sounds quite natural.",
    "voice": "female_01",
    "language": "en",
    "speed": 1.0
  }
}
```

### Voice cloning

```json
{
  "input": {
    "text": "This is a custom voice saying hello to everyone listening.",
    "voice_sample_url": "https://example.com/voice-sample.mp3",
    "language": "en",
    "speed": 1.0
  }
}
```

### Styled speech

```json
{
  "input": {
    "text": "Breaking news! Scientists have made an incredible discovery!",
    "voice": "male_02",
    "style": "newsreader",
    "emotion": "excited",
    "language": "en"
  }
}
```

## Configuration

### Environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| `TTS_MODEL` | TTS model to use | `XTTS-v2` |
| `DEFAULT_VOICE` | Default voice if not specified | `female_01` |
| `DEFAULT_LANGUAGE` | Default language code | `en` |
| `ENABLE_VOICE_CLONING` | Enable voice cloning feature | `true` |
| `MAX_TEXT_LENGTH` | Maximum input text length | `1000` |

### Model options

| Model ID | Description | VRAM Required |
|----------|-------------|--------------|
| `XTTS-v2` | High-quality multilingual TTS | 8GB+ |
| `Bark` | Versatile TTS with ambient sounds | 10GB+ |
| `Coqui-TTS` | Lightweight TTS model | 4GB+ |

## Voice options

| Voice ID | Description | Languages |
|----------|-------------|-----------|
| `female_01` | Professional female voice | en, es, fr |
| `female_02` | Young female voice | en, de, fr |
| `male_01` | Deep male voice | en, es, de |
| `male_02` | Professional male voice | en, fr, it |
| `child_01` | Child voice | en |

## Performance considerations

- L4 GPUs can generate speech at approximately 20-30x realtime (20-30 seconds of audio per second)
- A single worker can handle multiple concurrent requests
- For high-throughput applications, consider using multiple workers
- Text length directly impacts generation time
- Voice cloning requires additional processing time (5-10 seconds per request)

## Advanced usage

### Background music mixing

```json
{
  "input": {
    "text": "Welcome to our podcast about science and technology.",
    "voice": "male_01",
    "background_music": {
      "url": "https://example.com/background-music.mp3",
      "volume": 0.2
    }
  }
}
```

### Multi-voice conversations

```json
{
  "input": {
    "conversation": [
      {"speaker": "female_01", "text": "Hello, how are you today?"},
      {"speaker": "male_01", "text": "I'm doing great, thanks for asking!"},
      {"speaker": "female_01", "text": "Wonderful to hear that. Let's get started."}
    ],
    "language": "en"
  }
}
```

## Examples

### Python client example

```python
import requests
import base64
import io
from pydub import AudioSegment
from pydub.playback import play

API_KEY = "YOUR_API_KEY"
ENDPOINT_ID = "YOUR_ENDPOINT_ID"

def generate_speech(text, voice="female_01", language="en"):
    url = f"https://api.runpod.ai/v2/{ENDPOINT_ID}/run"
    
    payload = {
        "input": {
            "text": text,
            "voice": voice,
            "language": language
        }
    }
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    response = requests.post(url, headers=headers, json=payload)
    response_json = response.json()
    
    # Get job ID
    job_id = response_json.get("id")
    
    # Check status and get result when complete
    status_url = f"https://api.runpod.ai/v2/{ENDPOINT_ID}/status/{job_id}"
    
    while True:
        status_response = requests.get(status_url, headers=headers)
        status_data = status_response.json()
        
        if status_data.get("status") == "COMPLETED":
            # Get the base64 audio data
            audio_data = status_data.get("output", {}).get("audio_base64")
            
            # Convert base64 to audio
            audio_bytes = base64.b64decode(audio_data)
            audio = AudioSegment.from_file(io.BytesIO(audio_bytes), format="mp3")
            
            # Save the audio
            audio.export("generated_speech.mp3", format="mp3")
            print("Speech generated successfully!")
            
            # Play the audio
            play(audio)
            break
        
        time.sleep(1)  # Poll every second

# Generate speech
generate_speech("Hello, this is a test of the text to speech system. It sounds quite natural.")
```

## Next steps

- [Explore vLLM workers](/docs/serverless/workers/vllm/overview) for text generation
- [Learn about Stable Diffusion workers](/docs/serverless/workers/specialized/stable-diffusion) for image generation
- [Configure autoscaling](/docs/serverless/manage/scaling) to optimize cost and performance

> **Pro tip**: Combine TTS with other workers to create end-to-end applications, such as text generation → speech synthesis or text → image → video narration pipelines. 
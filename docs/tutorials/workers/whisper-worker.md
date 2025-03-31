---
title: Build a Whisper STT worker
description: "Create a customized speech-to-text worker using OpenAI's Whisper model on RunPod. Learn how to build, deploy, and optimize your own STT solution for accurate audio transcription."
sidebar_position: 3
---

# Building a Whisper speech-to-text worker

In this tutorial, you'll learn how to create a custom speech-to-text (STT) worker using OpenAI's Whisper model on RunPod. We'll walk through setting up your development environment, customizing the worker for specific needs, and deploying it as a serverless endpoint.

## Prerequisites

- RunPod account with serverless access
- Docker installed locally
- Basic understanding of Python and Docker
- Audio files for testing (WAV, MP3, FLAC, etc.)

## Step 1: Set up your development environment

1. Clone the RunPod Whisper worker template:

```bash
git clone https://github.com/runpod-workers/worker-whisper.git
cd worker-whisper
```

2. Create a Python virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install development dependencies:

```bash
pip install -r requirements.txt
```

## Step 2: Understand the worker structure

The template worker includes these key files:

- `handler.py`: The main worker logic that processes requests
- `Dockerfile`: Instructions for building the worker container
- `src/rp_handler.py`: Core inference logic using Whisper
- `src/whisper_processor.py`: Audio processing and transcription logic

## Step 3: Customize the worker for your use case

Let's modify the worker to use a specific Whisper model and add custom parameters.

1. Open `src/whisper_processor.py` and modify the model initialization:

```python
import os
import torch
import whisper
from whisper.utils import get_writer

class WhisperProcessor:
    def __init__(self):
        # Get model size from environment variable or use default
        model_size = os.environ.get("WHISPER_MODEL", "medium")
        
        # Configure device and compute type
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.compute_type = os.environ.get("COMPUTE_TYPE", "float16")
        
        # Define valid options
        self.valid_languages = whisper.tokenizer.LANGUAGES
        self.valid_tasks = ["transcribe", "translate"]
        
        # Load the model - this will download if not cached
        print(f"Loading Whisper {model_size} model...")
        self.model = whisper.load_model(
            model_size,
            device=self.device,
            download_root="/runpod-volume/whisper-models"
        )
        print(f"Model loaded on {self.device} using {self.compute_type}")

    def process_audio(self, audio_path, options=None):
        if options is None:
            options = {}
        
        # Set default options
        task = options.get("task", "transcribe")
        language = options.get("language", None)
        temperature = options.get("temperature", 0.0)
        initial_prompt = options.get("initial_prompt", None)
        word_timestamps = options.get("word_timestamps", False)
        output_format = options.get("output_format", "all")
        
        # Validate options
        if task not in self.valid_tasks:
            raise ValueError(f"Task must be one of {self.valid_tasks}")
        
        if language is not None and language not in self.valid_languages:
            raise ValueError(f"Language not supported. Must be one of {list(self.valid_languages.keys())}")
        
        # Prepare transcription options
        transcribe_options = {
            "task": task,
            "temperature": temperature,
            "initial_prompt": initial_prompt,
            "word_timestamps": word_timestamps
        }
        
        if language:
            transcribe_options["language"] = language
        
        # Run transcription
        print(f"Processing audio file: {audio_path}")
        result = self.model.transcribe(
            audio_path,
            **transcribe_options
        )
        
        # Format the output based on user preference
        if output_format == "text":
            return {"text": result["text"]}
        elif output_format == "srt":
            writer = get_writer("srt", ".")
            srt_content = writer(result, audio_path)
            return {"text": result["text"], "srt": srt_content}
        elif output_format == "vtt":
            writer = get_writer("vtt", ".")
            vtt_content = writer(result, audio_path)
            return {"text": result["text"], "vtt": vtt_content}
        else:  # "all"
            return result
```

2. Update the handler in `src/rp_handler.py`:

```python
import os
import time
import base64
import tempfile
import traceback
from .download import download_file_from_url
from .whisper_processor import WhisperProcessor

# Initialize the processor
processor = WhisperProcessor()

def handler(job):
    '''
    Handler function for processing speech-to-text jobs
    '''
    job_input = job["input"]
    
    # Start timing for performance metrics
    start_time = time.time()
    
    try:
        # Check for audio input (required)
        if "audio" not in job_input:
            return {"error": "Audio input is required. Provide a URL or base64 encoded audio"}
        
        # Get processing options
        options = job_input.get("options", {})
        
        # Create temp directory for audio file
        with tempfile.TemporaryDirectory() as temp_dir:
            audio_path = os.path.join(temp_dir, "audio_input")
            
            # Handle audio input - either URL or base64
            if "url" in job_input["audio"]:
                audio_url = job_input["audio"]["url"]
                print(f"Downloading audio from: {audio_url}")
                download_file_from_url(audio_url, audio_path)
            elif "base64" in job_input["audio"]:
                audio_data = job_input["audio"]["base64"]
                
                # Handle potential prefixes in base64 data
                if "," in audio_data:
                    audio_data = audio_data.split(",")[1]
                
                with open(audio_path, "wb") as f:
                    f.write(base64.b64decode(audio_data))
            else:
                return {"error": "Invalid audio input. Provide either 'url' or 'base64'"}
            
            # Process the audio file
            result = processor.process_audio(audio_path, options)
            
            # Calculate processing time
            processing_time = time.time() - start_time
            
            # Add metadata to the result
            result_with_metadata = {
                "transcription": result,
                "metadata": {
                    "model": os.environ.get("WHISPER_MODEL", "medium"),
                    "processing_time": processing_time
                }
            }
            
            return result_with_metadata
            
    except Exception as e:
        error_traceback = traceback.format_exc()
        print(f"Error processing audio: {str(e)}\n{error_traceback}")
        return {
            "error": str(e),
            "traceback": error_traceback
        }
```

3. Update the Dockerfile to customize the environment:

```dockerfile
FROM runpod/base:0.4.0-cuda11.8.0

# Set environment variables
ENV WHISPER_MODEL="medium"
ENV COMPUTE_TYPE="float16"
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install ffmpeg for audio processing
RUN apt-get update && apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Copy and install requirements
COPY builder/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all files
COPY . .

# Create volume for model caching
VOLUME /runpod-volume/whisper-models

# Pre-download the model
RUN python -c "import whisper; whisper.load_model('${WHISPER_MODEL}')"

# Start the worker
CMD ["python", "-u", "handler.py"]
```

## Step 4: Test the worker locally

1. Create a test input file named `test_input.json`:

```json
{
  "input": {
    "audio": {
      "url": "https://storage.googleapis.com/aai-web-samples/instrumental_speech.wav"
    },
    "options": {
      "task": "transcribe",
      "language": "en",
      "word_timestamps": true,
      "output_format": "all"
    }
  }
}
```

2. Run the worker locally:

```bash
python -m handler
```

## Step 5: Build and push the Docker image

1. Build the Docker image:

```bash
docker build -t your-username/whisper-worker:latest .
```

2. Push to Docker Hub:

```bash
docker push your-username/whisper-worker:latest
```

## Step 6: Deploy to RunPod

1. Go to the [RunPod Serverless Console](https://www.runpod.io/console/serverless)
2. Click "New Endpoint"
3. Enter your Docker image URL
4. Configure your endpoint settings:
   - GPU Type: T4 or better recommended
   - Worker Count: 0 (scale to zero) or 1+ to keep warm
   - Max Workers: Set based on expected load
   - Advanced Settings: Set environment variables if needed
5. Click "Deploy"

## Step 7: Test your deployed endpoint

Use this Python code to test your endpoint:

```python
import requests
import json
import time
import base64

API_KEY = "YOUR_API_KEY"
ENDPOINT_ID = "YOUR_ENDPOINT_ID"

def transcribe_audio(audio_file_path=None, audio_url=None, options=None):
    url = f"https://api.runpod.ai/v2/{ENDPOINT_ID}/run"
    
    if options is None:
        options = {
            "task": "transcribe",
            "language": "en",
            "output_format": "all"
        }
    
    # Prepare payload
    payload = {
        "input": {
            "audio": {},
            "options": options
        }
    }
    
    # Add audio source (file or URL)
    if audio_file_path:
        with open(audio_file_path, "rb") as f:
            audio_base64 = base64.b64encode(f.read()).decode('utf-8')
            payload["input"]["audio"]["base64"] = audio_base64
    elif audio_url:
        payload["input"]["audio"]["url"] = audio_url
    else:
        raise ValueError("Either audio_file_path or audio_url must be provided")
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    # Submit job
    response = requests.post(url, headers=headers, json=payload)
    response_json = response.json()
    
    job_id = response_json.get("id")
    status_url = f"https://api.runpod.ai/v2/{ENDPOINT_ID}/status/{job_id}"
    
    # Poll for job completion
    while True:
        status_response = requests.get(status_url, headers=headers)
        status_data = status_response.json()
        
        if status_data.get("status") == "COMPLETED":
            return status_data.get("output")
        elif status_data.get("status") == "FAILED":
            return {"error": "Job failed", "details": status_data}
        
        time.sleep(2)

# Example usage with URL
result = transcribe_audio(
    audio_url="https://storage.googleapis.com/aai-web-samples/instrumental_speech.wav",
    options={
        "task": "transcribe",
        "language": "en",
        "word_timestamps": True
    }
)

print(result["transcription"]["text"])

# Example with local file
# result = transcribe_audio(
#     audio_file_path="path/to/your/audio.mp3",
#     options={"task": "transcribe"}
# )
```

## Batch processing multiple files

For batch processing, you can create a script to handle multiple files:

```python
import os
import json
import time
from concurrent.futures import ThreadPoolExecutor
from transcribe import transcribe_audio  # Import the function from above

def process_directory(directory_path, output_directory, max_workers=3):
    """Process all audio files in a directory"""
    
    # Create output directory if it doesn't exist
    os.makedirs(output_directory, exist_ok=True)
    
    # Get all audio files
    audio_files = [
        os.path.join(directory_path, f) for f in os.listdir(directory_path)
        if f.endswith(('.mp3', '.wav', '.flac', '.m4a', '.ogg'))
    ]
    
    print(f"Found {len(audio_files)} audio files to process")
    
    # Process files in parallel
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = []
        
        for audio_file in audio_files:
            base_name = os.path.basename(audio_file)
            output_file = os.path.join(output_directory, f"{os.path.splitext(base_name)[0]}.json")
            
            # Skip if already processed
            if os.path.exists(output_file):
                print(f"Skipping {base_name} - already processed")
                continue
                
            # Submit transcription job
            future = executor.submit(
                process_file,
                audio_file,
                output_file
            )
            futures.append(future)
        
        # Wait for all jobs to complete
        for i, future in enumerate(futures):
            try:
                result = future.result()
                print(f"Completed {i+1}/{len(futures)}: {result}")
            except Exception as e:
                print(f"Error in job {i+1}/{len(futures)}: {str(e)}")

def process_file(audio_file, output_file):
    """Process a single audio file and save results"""
    try:
        # Get filename for logging
        filename = os.path.basename(audio_file)
        
        print(f"Processing {filename}...")
        result = transcribe_audio(
            audio_file_path=audio_file,
            options={
                "task": "transcribe",
                "output_format": "all"
            }
        )
        
        # Save the result
        with open(output_file, 'w') as f:
            json.dump(result, f, indent=2)
            
        return f"{filename} -> {output_file}"
        
    except Exception as e:
        print(f"Error processing {audio_file}: {str(e)}")
        return f"Failed: {audio_file} - {str(e)}"

# Example usage
if __name__ == "__main__":
    process_directory(
        directory_path="./audio_files",
        output_directory="./transcripts",
        max_workers=3
    )
```

## Advanced customizations

### 1. Fine-tuning for domain-specific audio

If you're working with specialized vocabulary (medical, legal, etc.), you can improve transcription by providing initial prompts:

```python
options = {
    "task": "transcribe",
    "language": "en",
    "initial_prompt": "The following is a medical consultation about cardiovascular disease. Technical terms include: myocardial infarction, atherosclerosis, ventricular tachycardia."
}
```

### 2. Custom vocabulary support

Add custom vocabulary support by extending the processor:

```python
def add_custom_vocabulary(self, text, custom_vocab):
    """Add custom vocabulary terms to improve recognition."""
    for term, phonetic in custom_vocab.items():
        # Simple find-and-replace for corrections
        text = text.replace(phonetic, term)
    return text

# Later in process_audio:
if "custom_vocabulary" in options:
    result["text"] = self.add_custom_vocabulary(
        result["text"], 
        options["custom_vocabulary"]
    )
```

### 3. Audio enhancement with noise reduction

Add preprocessing with noise reduction:

```python
def preprocess_audio(self, input_path, output_path):
    """Apply noise reduction to improve audio quality."""
    import ffmpeg
    
    try:
        # Apply noise reduction filter using ffmpeg
        (
            ffmpeg
            .input(input_path)
            .audio
            .filter('afftdn')  # FFT-based denoiser
            .output(output_path)
            .run(quiet=True, overwrite_output=True)
        )
        return True
    except Exception as e:
        print(f"Audio preprocessing failed: {str(e)}")
        return False
```

### 4. Enable model parallelism for larger models

For the large model, enable model parallelism:

```python
# In WhisperProcessor.__init__
num_gpus = torch.cuda.device_count()
if num_gpus > 1 and model_size == "large":
    # Enable model parallelism for large model
    print(f"Enabling model parallelism across {num_gpus} GPUs")
    self.model.to(device=self.device)
```

## Next steps

- Integrate with speech diarization to identify different speakers
- Add support for timestamp-based video captioning
- Implement a webhook system for async job completion notifications
- Create a simple web UI for uploading and transcribing files
- Explore using different Whisper models for various accuracy/speed tradeoffs

> **Pro tip**: For long audio files, consider adding an option to split the audio into smaller chunks before processing, which can improve accuracy and reduce memory usage for extended recordings. 
---
title: Build a custom worker from scratch
description: "Learn how to create a custom RunPod worker from scratch. This step-by-step guide covers setting up the project structure, implementing the handler, building the container, and deploying to RunPod Serverless."
sidebar_position: 4
---

# Building a custom worker from scratch

In this tutorial, you'll learn how to build a custom RunPod worker completely from scratch. Rather than starting with an existing template, we'll walk through creating each component of a worker, helping you understand the architecture and customize it for your specific needs.

## Prerequisites

- RunPod account with serverless access
- Docker installed locally
- Basic understanding of Python and Docker
- Git for version control (optional)

## Step 1: Set up your project structure

First, let's create a directory structure for our worker:

```bash
mkdir -p my-custom-worker/{src,builder}
cd my-custom-worker
```

Now, create the basic files for your worker:

```bash
touch handler.py
touch Dockerfile
touch README.md
touch src/__init__.py
touch src/rp_handler.py
touch builder/requirements.txt
```

## Step 2: Define your worker's function

For this tutorial, we'll create an image processing worker that can perform basic operations like resizing, cropping, and applying filters. Let's start by defining the requirements:

```bash
# Add these to builder/requirements.txt
runpod==1.2.0
Pillow==10.0.0
numpy==1.24.3
requests==2.30.0
```

Now, let's implement the core functionality in `src/image_processor.py`:

```bash
touch src/image_processor.py
```

Edit the file with the following content:

```python
import os
from io import BytesIO
import base64
from PIL import Image, ImageFilter, ImageOps, ImageEnhance

class ImageProcessor:
    """
    Class for handling image processing operations
    """
    
    @staticmethod
    def load_image(image_data=None, image_path=None):
        """Load an image from data or path"""
        if image_data:
            return Image.open(BytesIO(image_data))
        elif image_path:
            return Image.open(image_path)
        else:
            raise ValueError("Either image_data or image_path must be provided")
    
    @staticmethod
    def resize_image(image, width=None, height=None, maintain_aspect=True):
        """Resize an image to specified dimensions"""
        if width is None and height is None:
            return image
            
        if maintain_aspect:
            if width and height:
                return image.thumbnail((width, height))
            elif width:
                ratio = width / image.width
                height = int(image.height * ratio)
                return image.resize((width, height), Image.LANCZOS)
            elif height:
                ratio = height / image.height
                width = int(image.width * ratio)
                return image.resize((width, height), Image.LANCZOS)
        else:
            if width is None:
                width = image.width
            if height is None:
                height = image.height
            return image.resize((width, height), Image.LANCZOS)
    
    @staticmethod
    def crop_image(image, left, top, right, bottom):
        """Crop image to specified coordinates"""
        return image.crop((left, top, right, bottom))
    
    @staticmethod
    def apply_filter(image, filter_name):
        """Apply a filter to the image"""
        filters = {
            "blur": ImageFilter.BLUR,
            "sharpen": ImageFilter.SHARPEN,
            "contour": ImageFilter.CONTOUR,
            "edge_enhance": ImageFilter.EDGE_ENHANCE,
            "emboss": ImageFilter.EMBOSS,
            "smooth": ImageFilter.SMOOTH,
            "grayscale": "grayscale"
        }
        
        if filter_name not in filters:
            raise ValueError(f"Filter '{filter_name}' not supported. Available filters: {list(filters.keys())}")
        
        if filter_name == "grayscale":
            return ImageOps.grayscale(image)
        else:
            return image.filter(filters[filter_name])
    
    @staticmethod
    def adjust_image(image, brightness=None, contrast=None, saturation=None):
        """Adjust image properties"""
        result = image
        
        if brightness is not None:
            enhancer = ImageEnhance.Brightness(result)
            result = enhancer.enhance(brightness)
            
        if contrast is not None:
            enhancer = ImageEnhance.Contrast(result)
            result = enhancer.enhance(contrast)
            
        if saturation is not None:
            enhancer = ImageEnhance.Color(result)
            result = enhancer.enhance(saturation)
            
        return result
    
    @staticmethod
    def image_to_base64(image, format="JPEG", quality=85):
        """Convert image to base64 string"""
        buffer = BytesIO()
        image.save(buffer, format=format, quality=quality)
        img_str = base64.b64encode(buffer.getvalue()).decode('utf-8')
        return f"data:image/{format.lower()};base64,{img_str}"
    
    @staticmethod
    def process_image(input_data):
        """Process an image based on input parameters"""
        try:
            # Extract image data - either from URL or base64
            image_data = input_data.get("image", {})
            
            if "url" in image_data:
                import requests
                response = requests.get(image_data["url"], stream=True)
                image = ImageProcessor.load_image(image_data=response.content)
            elif "base64" in image_data:
                # Handle potential base64 prefixes
                base64_data = image_data["base64"]
                if "base64," in base64_data:
                    base64_data = base64_data.split("base64,")[1]
                
                image = ImageProcessor.load_image(image_data=base64.b64decode(base64_data))
            else:
                raise ValueError("Image source not specified. Provide 'url' or 'base64'")
            
            # Get operations to perform
            operations = input_data.get("operations", [])
            
            # Apply each operation in sequence
            for operation in operations:
                op_type = operation.get("type")
                params = operation.get("params", {})
                
                if op_type == "resize":
                    width = params.get("width")
                    height = params.get("height")
                    maintain_aspect = params.get("maintain_aspect", True)
                    image = ImageProcessor.resize_image(image, width, height, maintain_aspect)
                
                elif op_type == "crop":
                    left = params.get("left", 0)
                    top = params.get("top", 0)
                    right = params.get("right", image.width)
                    bottom = params.get("bottom", image.height)
                    image = ImageProcessor.crop_image(image, left, top, right, bottom)
                
                elif op_type == "filter":
                    filter_name = params.get("name")
                    if not filter_name:
                        raise ValueError("Filter name not specified")
                    image = ImageProcessor.apply_filter(image, filter_name)
                
                elif op_type == "adjust":
                    brightness = params.get("brightness")
                    contrast = params.get("contrast")
                    saturation = params.get("saturation")
                    image = ImageProcessor.adjust_image(image, brightness, contrast, saturation)
                
                else:
                    raise ValueError(f"Unknown operation type: {op_type}")
            
            # Get output format
            output_format = input_data.get("output", {})
            format_type = output_format.get("format", "JPEG")
            quality = output_format.get("quality", 85)
            
            # Convert to base64 for output
            result_base64 = ImageProcessor.image_to_base64(image, format=format_type, quality=quality)
            
            return {
                "success": True,
                "processed_image": result_base64,
                "metadata": {
                    "width": image.width,
                    "height": image.height,
                    "format": format_type
                }
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
```

## Step 3: Implement the handler

Now, let's implement the RunPod handler in `src/rp_handler.py`:

```python
from .image_processor import ImageProcessor

def handler(event):
    """
    This is the handler function that will be called by the serverless.
    """
    try:
        # Get job input
        job_input = event.get("input", {})
        
        # Process the image
        result = ImageProcessor.process_image(job_input)
        
        # Return the result
        return result
        
    except Exception as e:
        # Return error information
        return {
            "success": False,
            "error": str(e)
        }
```

And in the main `handler.py` file:

```python
#!/usr/bin/env python3
import runpod
import os
import sys

# Add the src directory to the path so we can import our modules
sys.path.append(os.path.dirname(os.path.realpath(__file__)))

from src.rp_handler import handler

# Start the serverless function
runpod.serverless.start({"handler": handler})
```

## Step 4: Create the Dockerfile

Now, let's create a Docker container for our worker:

```dockerfile
FROM python:3.9-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsm6 \
    libxext6 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY builder/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application
COPY . .

# Run the worker
CMD ["python", "-u", "handler.py"]
```

## Step 5: Create a README

Let's add documentation in `README.md`:

```markdown
# Custom Image Processing Worker for RunPod

This worker provides image processing capabilities including resizing, cropping, filtering, and adjustments.

## Input Format

The worker accepts the following input structure:

```json
{
  "image": {
    "url": "https://example.com/image.jpg"
    // or
    "base64": "base64_encoded_image_data"
  },
  "operations": [
    {
      "type": "resize",
      "params": {
        "width": 800,
        "height": 600,
        "maintain_aspect": true
      }
    },
    {
      "type": "filter",
      "params": {
        "name": "sharpen"
      }
    }
  ],
  "output": {
    "format": "JPEG",
    "quality": 85
  }
}
```

## Operations

The following operations are supported:

1. **resize** - Resize an image
   - `width`: Target width in pixels
   - `height`: Target height in pixels
   - `maintain_aspect`: Boolean to maintain aspect ratio

2. **crop** - Crop an image
   - `left`: Left coordinate
   - `top`: Top coordinate
   - `right`: Right coordinate
   - `bottom`: Bottom coordinate

3. **filter** - Apply a filter
   - `name`: One of "blur", "sharpen", "contour", "edge_enhance", "emboss", "smooth", "grayscale"

4. **adjust** - Adjust image properties
   - `brightness`: Float value (1.0 is original, 0.0 is black, 2.0 is twice as bright)
   - `contrast`: Float value (1.0 is original, 0.0 is gray, 2.0 is twice the contrast)
   - `saturation`: Float value (1.0 is original, 0.0 is grayscale, 2.0 is twice the saturation)

## Output

The worker returns:

```json
{
  "success": true,
  "processed_image": "base64_encoded_result_image",
  "metadata": {
    "width": 800,
    "height": 600,
    "format": "JPEG"
  }
}
```

## Error Handling

In case of errors:

```json
{
  "success": false,
  "error": "Error message"
}
```
```

## Step 6: Build and test locally

Let's build and test our worker locally:

1. Build the Docker image:

```bash
docker build -t my-custom-worker:latest .
```

2. Create a test file named `test_input.json`:

```json
{
  "input": {
    "image": {
      "url": "https://images.unsplash.com/photo-1682687220063-4742bd7fd538"
    },
    "operations": [
      {
        "type": "resize",
        "params": {
          "width": 800,
          "height": 600,
          "maintain_aspect": true
        }
      },
      {
        "type": "filter",
        "params": {
          "name": "sharpen"
        }
      },
      {
        "type": "adjust",
        "params": {
          "brightness": 1.2,
          "contrast": 1.1
        }
      }
    ],
    "output": {
      "format": "JPEG",
      "quality": 90
    }
  }
}
```

3. Run the Docker container and test the worker:

```bash
docker run -it --rm -v $(pwd)/test_input.json:/app/test_input.json my-custom-worker:latest python -c "import json; from src.rp_handler import handler; print(json.dumps(handler(json.load(open('test_input.json'))), indent=2))"
```

## Step 7: Push to Docker Hub

After testing, push your worker to Docker Hub:

```bash
# Log in to Docker Hub
docker login

# Tag your image
docker tag my-custom-worker:latest yourusername/my-custom-worker:latest

# Push to Docker Hub
docker push yourusername/my-custom-worker:latest
```

## Step 8: Deploy to RunPod

1. Go to the [RunPod Serverless Console](https://www.runpod.io/console/serverless)
2. Click "New Endpoint"
3. Enter your Docker image URL (e.g., `yourusername/my-custom-worker:latest`)
4. Configure your endpoint settings:
   - GPU Type: CPU is sufficient for basic image processing, but choose a GPU if needed
   - Worker Count: 0 (scale to zero) or 1+ to keep warm
   - Max Workers: Set based on expected load
5. Click "Deploy"

## Step 9: Test your deployed endpoint

Use this Python code to test your endpoint:

```python
import requests
import json
import time
import base64
from PIL import Image
from io import BytesIO

API_KEY = "YOUR_API_KEY"
ENDPOINT_ID = "YOUR_ENDPOINT_ID"

def process_image(image_path=None, image_url=None, operations=None, output=None):
    url = f"https://api.runpod.ai/v2/{ENDPOINT_ID}/run"
    
    if operations is None:
        operations = [
            {
                "type": "resize",
                "params": {
                    "width": 800,
                    "maintain_aspect": True
                }
            }
        ]
    
    if output is None:
        output = {
            "format": "JPEG",
            "quality": 85
        }
    
    # Prepare payload
    payload = {
        "input": {
            "image": {},
            "operations": operations,
            "output": output
        }
    }
    
    # Add image source (file or URL)
    if image_path:
        with open(image_path, "rb") as f:
            img_base64 = base64.b64encode(f.read()).decode('utf-8')
            payload["input"]["image"]["base64"] = img_base64
    elif image_url:
        payload["input"]["image"]["url"] = image_url
    else:
        raise ValueError("Either image_path or image_url must be provided")
    
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
        
        time.sleep(1)

# Example usage with URL
result = process_image(
    image_url="https://images.unsplash.com/photo-1682687220063-4742bd7fd538",
    operations=[
        {
            "type": "resize",
            "params": {
                "width": 800,
                "maintain_aspect": True
            }
        },
        {
            "type": "filter",
            "params": {
                "name": "sharpen"
            }
        }
    ]
)

if result.get("success"):
    # Display or save the image
    image_data = result["processed_image"].split("base64,")[1]
    image_bytes = base64.b64decode(image_data)
    
    # Open the image
    image = Image.open(BytesIO(image_bytes))
    
    # Save to file
    image.save("processed_image.jpg")
    print(f"Image processed successfully: {result['metadata']}")
else:
    print(f"Error: {result.get('error')}")
```

## Advanced improvements

Here are some ways to enhance your worker:

### 1. Add batch processing

Modify the handler to accept multiple images in a batch:

```python
def handler(event):
    try:
        job_input = event.get("input", {})
        
        # Check if this is a batch job
        if "images" in job_input:
            results = []
            
            for image_job in job_input["images"]:
                # Process each image
                result = ImageProcessor.process_image(image_job)
                results.append(result)
                
            return {
                "success": True,
                "results": results
            }
        else:
            # Single image processing
            return ImageProcessor.process_image(job_input)
            
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
```

### 2. Add image analysis

Extend the processor to include analysis features:

```python
@staticmethod
def analyze_image(image):
    """Analyze image properties"""
    import numpy as np
    
    # Convert to numpy array
    img_array = np.array(image)
    
    # Calculate histogram
    hist_r = np.histogram(img_array[..., 0], bins=256, range=(0, 256))[0] if image.mode in ('RGB', 'RGBA') else []
    hist_g = np.histogram(img_array[..., 1], bins=256, range=(0, 256))[0] if image.mode in ('RGB', 'RGBA') else []
    hist_b = np.histogram(img_array[..., 2], bins=256, range=(0, 256))[0] if image.mode in ('RGB', 'RGBA') else []
    
    # Calculate average brightness
    if image.mode == 'L':
        brightness = float(np.mean(img_array))
    else:
        brightness = float(np.mean(0.299 * img_array[..., 0] + 0.587 * img_array[..., 1] + 0.114 * img_array[..., 2]))
    
    return {
        "size": (image.width, image.height),
        "mode": image.mode,
        "format": image.format,
        "brightness": brightness,
        "histograms": {
            "r": hist_r.tolist() if len(hist_r) > 0 else [],
            "g": hist_g.tolist() if len(hist_g) > 0 else [],
            "b": hist_b.tolist() if len(hist_b) > 0 else []
        }
    }
```

### 3. Add caching

Implement a simple caching mechanism for frequently processed images:

```python
import hashlib

# Add to ImageProcessor class
image_cache = {}

@staticmethod
def get_cache_key(input_data):
    """Generate a cache key from input data"""
    return hashlib.md5(json.dumps(input_data, sort_keys=True).encode()).hexdigest()

@staticmethod
def process_image_with_cache(input_data):
    """Process image with caching"""
    cache_key = ImageProcessor.get_cache_key(input_data)
    
    # Check if result is in cache
    if cache_key in ImageProcessor.image_cache:
        print("Using cached result")
        return ImageProcessor.image_cache[cache_key]
    
    # Process image
    result = ImageProcessor.process_image(input_data)
    
    # Store in cache (with a limit)
    if len(ImageProcessor.image_cache) > 100:
        # Remove a random item if cache is full
        ImageProcessor.image_cache.pop(next(iter(ImageProcessor.image_cache)))
    
    ImageProcessor.image_cache[cache_key] = result
    return result
```

## Next steps

- Add more advanced image processing operations like object detection or segmentation
- Integrate with computer vision libraries like OpenCV
- Add support for WebP, AVIF, and other modern image formats
- Implement more sophisticated caching and optimization
- Create a simple web interface for testing your worker
- Set up monitoring and logging for production use
- Share your worker with the RunPod community

> **Pro tip**: Consider adding a simple health check endpoint to your worker to make sure it's running correctly and to monitor resource usage. 
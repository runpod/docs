import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import './spinner.css';

export default function NotFoundContent({ className }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); 
    const fetchImage = async () => {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: '5YLEDXAQKUKF86DX487GVYNGX3GDVW81Q881N5A4'
        },
        body: JSON.stringify({
          prompt: '404 Sign glitch art in space.',
          num_inference_steps: 25,
          refiner_inference_steps: 50,
          width: 1024,
          height: 1024,
          guidance_scale: 7.5,
          strength: 0.3,
          seed: null,
          num_images: 1

        })
      };

      try {
        const response = await fetch('https://api.runpod.ai/v2/sdxl/runsync', options);
        const data = await response.json();
        if (data && data.output && data.output.image_url) {
          setImageUrl(data.output.image_url);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false); // Stop loading regardless of the outcome
      }
    };

    fetchImage();
  }, []);

  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
        <Heading as="h1" className="hero__title">
            <Translate
              id="theme.NotFound.title"
              description="The title of the 404 page">
              Page Not Found
            </Translate>
          </Heading>
          <p>
            <Translate
              id="theme.NotFound.p1"
              description="The first paragraph of the 404 page">
              We could not find what you were looking for.
            </Translate>
          </p>
          <p>
            <Translate
              id="theme.NotFound.p2"
              description="The 2nd paragraph of the 404 page">
              Please contact the owner of the site that linked you to the
              original URL and let them know their link is broken.
            </Translate>
          </p>
          {/* Display the image if it's available */}
          {imageUrl && <img src={imageUrl} alt="Generated for 404 Page" />}
          {<div className="spinner"></div>}

          <p>This image was generated using RunPod's API.</p>
        </div>

      </div>
    </main>
  );
}

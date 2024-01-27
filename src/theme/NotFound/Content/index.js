import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function NotFoundContent({className}) {
  const [imageData, setImageData] = useState(null);
  const { siteConfig: { customFields } } = useDocusaurusContext();

  useEffect(() => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: customFields.runPodAIKey
      },
      body: JSON.stringify({
        input: {
          prompt: 'A visually striking 404 error page design, featuring bold Glitch Art influences with digital distortion effects. The theme is outer space, with a background of stars and galaxies. The design prominently displays the number 404 in a futuristic font, centered in the composition, evoking a sense of being lost in the cosmos. Make sure there are bright gold stars.',
          num_inference_steps: 25,
          refiner_inference_steps: 50,
          width: 1024,
          height: 1024,
          guidance_scale: 7.5,
          strength: 0.3,
          seed: null,
          num_images: 1
        }
      })
    };

    fetch('https://api.runpod.ai/v2/2hija9yaxkmo8g/runsync', options)
      .then(response => response.json())
      .then(data => {
        if (data && data.output) {
          const imageBase64 = data.output;
          const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
          setImageData(imageUrl);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            <Translate
              id="theme.NotFound.title"
              description="The title of the 404 page">
              Oops! This page is on a Space Mission.
            </Translate>
          </Heading>
          <p>
            <Translate
              id="theme.NotFound.p1"
              description="The first paragraph of the 404 page">
              It looks like the page you're seeking might have been abducted by aliens.
              Fear not, we'll help you navigate back to familiar space.
            </Translate>
          </p>
          <p>
            <Translate
              id="theme.NotFound.p2"
              description="The 2nd paragraph of the 404 page">
              If you're feeling a bit lost, don't hesitate to reach out to the hyperlink helpline —
              let the site owner know their link is floating in the digital void.
            </Translate>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Display the image if it's available */}
            {imageData && <img src={imageData} alt="AI generated 404 error page" />}
          </div>
          <p>
            <Translate
              id="theme.NotFound.p3"
              description="Paragraph explaining about the generated art">
              The cosmic art you see here was conjured up by the digital wizards at RunPod's Serverless Endpoint,
              specifically for this 404 page. Pretty neat, huh?
            </Translate>
          </p>
        </div>
      </div>
    </main>
  );
  }
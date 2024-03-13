import React, { useEffect, useState } from 'react';
import Particle from './Particle';

export default function Emitter({ numParticles, initialPos, glassPositions }) {
  const [particleComponents, setParticleComponents] = useState([]);

  useEffect(() => {
    const delay = 100;

    const createParticles = (index) => {
      setTimeout(() => {
        setParticleComponents((prevParticles) => [
          ...prevParticles,
          <Particle key={index} initialPos={initialPos} glassPositions={glassPositions} />,
        ]);
      }, index * delay);
    };

    if (glassPositions && Object.keys(glassPositions).length > 0) {
      for (let i = 0; i < numParticles; i++) {
        createParticles(i);
      }
    }
  }, [numParticles, glassPositions]);

  return <>{particleComponents}</>;
}

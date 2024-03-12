import React, { useEffect, useState } from 'react';
import Particle from './Particle';

export default function Emitter({ numParticles, glassPositions }) {
  const [particleComponents, setParticleComponents] = useState([]);

  useEffect(() => {
    const delay = 200;

    const createParticles = (index) => {
      setTimeout(() => {
        setParticleComponents((prevParticles) => [
          ...prevParticles,
          <Particle key={index} initialPos={[0, 10, 0]} glassPositions={glassPositions} />,
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

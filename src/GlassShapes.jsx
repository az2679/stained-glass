import Glass from './Glass';

export default function Sun({position, startIndex, color, passPosition}){
  return(
    <>
      <Glass index={startIndex} position={[position[0], position[1]+0.05, position[2]-1.85]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI*1.5, 0, -Math.PI/2]} />
      <Glass index={startIndex+1} position={[position[0], position[1]+1.1, position[2]]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI*0.5, 0, Math.PI/2]}/>
      <Glass index={startIndex+2} position={[position[0], position[1]+0.05, position[2]+1.85]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI*1.5, 0,-Math.PI/2]}/>
  
      <Glass index={startIndex+3} position={[position[0], position[1]-0.5, position[2]-0.865]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI/2, 0,-Math.PI/2]} />
      <Glass index={startIndex+4} position={[position[0], position[1], position[2]]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI*1.5, 0, Math.PI/2]}/>
      <Glass index={startIndex+5} position={[position[0], position[1]-0.5, position[2]+0.865]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI/2, 0,-Math.PI/2]}/>

      <Glass index={startIndex+6} position={[position[0], position[1]-1.5, position[2]-0.865]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI*1.5, 0, -Math.PI/2]} />
      <Glass index={startIndex+7} position={[position[0], position[1]-2, position[2]]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI*0.5, 0, Math.PI/2]}/>
      <Glass index={startIndex+8} position={[position[0], position[1]-1.5, position[2]+0.865]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI*1.5, 0,-Math.PI/2]}/>

      <Glass index={startIndex+9} position={[position[0], position[1]-2.05, position[2]-1.85]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI/2, 0,-Math.PI/2]} />
      <Glass index={startIndex+10} position={[position[0], position[1]-3.1, position[2]]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI*1.5, 0, Math.PI/2]}/>
      <Glass index={startIndex+11} position={[position[0], position[1]-2.05, position[2]+1.85]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI/2, 0,-Math.PI/2]}/>

      <Glass index={startIndex+12} position={[position[0], position[1]-1.05, position[2]+2.35]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI*0.65, 0,-Math.PI/2]}/>
      <Glass index={startIndex+13} position={[position[0], position[1]-1.05, position[2]-2.35]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI*0.35, 0,-Math.PI/2]}/>
      <Glass index={startIndex+14} position={[position[0], position[1]+1, position[2]+1.15]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI*0.35, 0,-Math.PI/2]}/>
      <Glass index={startIndex+15} position={[position[0], position[1]+1, position[2]-1.15]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI*0.65, 0,-Math.PI/2]}/>
      <Glass index={startIndex+16} position={[position[0], position[1]-3, position[2]+1.15]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI*0.35, 0,-Math.PI/2]}/>
      <Glass index={startIndex+17} position={[position[0], position[1]-3, position[2]-1.15]} color={color} geometry="triangle" sendPosition={passPosition} rotation={[-Math.PI*0.65, 0,-Math.PI/2]}/>
    </>
  )
}

export function Line({position, startIndex, color, passPosition}){
  return(
    <>
    <Glass index={startIndex} position={[position[0],position[1]+0.75,position[2]-0.75]} color={Array.isArray(color) ? color[0] : color} sendPosition={passPosition} /> 
    <Glass index={startIndex+1} position={[position[0],position[1]+0.75,position[2]+0.75]} color={Array.isArray(color) ? color[1] : color} sendPosition={passPosition} /> 
    <Glass index={startIndex+2} position={[position[0],position[1]+0.75,position[2]+2.25]} color={Array.isArray(color) ? color[2] : color} sendPosition={passPosition} /> 

    <Glass index={startIndex+3} position={[position[0],position[1],position[2]-1.5]} color={Array.isArray(color) ? color[1] : color} sendPosition={passPosition} /> 
    <Glass index={startIndex+4} position={[position[0],position[1],position[2]]} color={Array.isArray(color) ? color[2] : color} sendPosition={passPosition} /> 
    <Glass index={startIndex+5} position={[position[0],position[1],position[2]+1.5]} color={Array.isArray(color) ? color[0] : color} sendPosition={passPosition} /> 
    <Glass index={startIndex+6} position={[position[0],position[1],position[2]+3]} color={Array.isArray(color) ? color[1] : color} sendPosition={passPosition} /> 
    </>
  )
}

export function Wall({ position, startIndex, color, colorPattern, passPosition }) {
  const numRows = 10;
  const numCols = 10;
  const glassColor = Array.isArray(color) ? color : [color];

  const glasses = [];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const index = startIndex + row * numCols + col;
      const glassPosition = [
        position[0] + 0.75 * col,
        position[1] + 0.75 * row,
        position[2]
      ];

      // const alternateColorIndex = (row + col) % glassColor.length
      // const randomColorIndex = Math.floor(Math.random() * glassColor.length)

      const colorIndex = colorPattern === 'alternate' ? (row + col) % glassColor.length : Math.floor(Math.random() * glassColor.length);

      glasses.push(
        <Glass
          key={index}
          index={index}
          position={glassPosition}
          color={glassColor[colorIndex]}
          sendPosition={passPosition}
          rotation={[0, -Math.PI / 2, -Math.PI / 2]}
        />
      );
    }
  }

  return (
    <>
      {glasses}
    </>
  );
}

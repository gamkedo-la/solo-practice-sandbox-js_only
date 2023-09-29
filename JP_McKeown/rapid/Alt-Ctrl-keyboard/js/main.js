// prototype Alt-Ctrl keyboard key locastion = coordinate

// 2-dimensional array of QWERTY keyboard layout 9x3
const keyboardRows = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
];

const screenWidth = 800;
const screenHeight = 600;
const ctx = gameCanvas.getContext('2d');

const xSpacing = screenWidth / keyboardRows[1].length;
const ySpacing = screenHeight / 4;

document.addEventListener("keydown", function(event) {
  const pressedKey = event.key.toLowerCase(); 
  
  // Function to find the row and column of the pressed key in the array
  function findKeyPosition(key) {
    for (let row = 0; row < keyboardRows.length; row++) {
      const columnIndex = keyboardRows[row].indexOf(key);
      if (columnIndex !== -1) {
        return { row, column: columnIndex };
      }
    }
    return null; // Key not found
  }
  
  // Find the position of the pressed key in the array
  const keyPosition = findKeyPosition(pressedKey);
  
  if (keyPosition) {
    const { row, column } = keyPosition;
    
    // Calculate screen coordinates based on the position of the key in the array
    let x = column * xSpacing;
    let y = row * ySpacing; 
    
    console.log(`Pressed key: ${pressedKey}, coordinates: (${x}, ${y})`);
    
    let centreX = x + xSpacing / 2;
    let centreY = y + ySpacing / 2;
    let radius = xSpacing / 3;
    let fillColour = 'red';
    drawCircle(centreX, centreY, radius, fillColour);
  }
});
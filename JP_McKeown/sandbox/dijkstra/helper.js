function getIndexFromCoord(row, col, rowLength) {
   return row * rowLength + col
}


function arrayContains(arr, obj) {
   var arrLen = arr.length;
   for (var i = 0; i < arrLen; i++) {
      if (arr[i] === obj) {
         return true;
      }
   }
   return false;
}


function arrayRemove(arr, obj) {
   for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i] === obj) {
         arr.splice(i, 1);
         return;
      }
   }
}


function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
   canvasContext.fillStyle = fillColor;
   canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}


function outlineRect(topLeftX, topLeftY, boxWidth, boxHeight, lineColor) {
   canvasContext.beginPath();
   canvasContext.strokeStyle = lineColor;
   canvasContext.lineWidth = "3";
   canvasContext.rect(topLeftX, topLeftY, boxWidth, boxHeight);
   canvasContext.stroke();
}


function randomInteger(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
}


function randomQuarter(n) {
   const quarters = [1, 2, 3, 4];

   // Randomly select two different quarters
   const [q1, q2] = quarters.sort(() => Math.random() - 0.5).slice(0, 2);

   // Randomly generate row,col coordinates for two cells (start & end)
   const [row1, col1] = [
      Math.floor(Math.random() * (n / 2)) + (q1 <= 2 ? 0 : n / 2),
      Math.floor(Math.random() * (n / 2)) + (q1 % 2 === 0 ? 0 : n / 2)
   ];

   const [row2, col2] = [
      Math.floor(Math.random() * (n / 2)) + (q2 <= 2 ? 0 : n / 2),
      Math.floor(Math.random() * (n / 2)) + (q2 % 2 === 0 ? 0 : n / 2)
   ];

   return [
      [row1, col1],
      [row2, col2]
   ];
}

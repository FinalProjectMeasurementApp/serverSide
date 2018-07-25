module.exports = {
  areaCalculator: function(arrayOfCoordinates) {
    let area = 0;
    let totalCoordinates = arrayOfCoordinates.length;
    // last coordinate
    var coordinateTwo = arrayOfCoordinates[totalCoordinates - 1];
    for (let i = 0; i < totalCoordinates; i++) {
      let coordinateOne = arrayOfCoordinates[i];
      area += coordinateOne[0] * coordinateTwo[1];
      area -= coordinateOne[1] * coordinateTwo[0];
      // for next iteration, coordinate two is the previous coordinate before coordiante one
      coordinateTwo = coordinateOne;
    }
    return area / 2;
  }
};

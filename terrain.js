function drawTerrain(w, h, scaleSize, frameH, edgeCol, mainCol){
    let noiseScale = 0.01;
    for (let x = 0; x < w; x++) {
    let noiseVal = noise(x * noiseScale);
    // draw edge 
      
    push();
    stroke(edgeCol);
    line(x, noiseVal*80, x, h - frameH );
    pop();
    // draw main
    push();
    stroke(mainCol);
    line(x, noiseVal*120, x, h - frameH);
    pop();
  }
}
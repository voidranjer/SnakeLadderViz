function drawArrowWithTip(x1, y1, x2, y2, color = "red", arrowSize = 15) {
  // styles
  fill(color);
  stroke(color);

  // Draw the line
  strokeWeight(arrowSize * 0.2);
  line(x1, y1, x2, y2);
  strokeWeight(1);

  // Calculate the aSizef the line
  const angle = atan2(y2 - y1, x2 - x1);

  // Calculate arrowhead coordinates
  const x3 = x2 - arrowSize * cos(angle - PI / 6);
  const y3 = y2 - arrowSize * sin(angle - PI / 6);
  const x4 = x2 - arrowSize * cos(angle + PI / 6);
  const y4 = y2 - arrowSize * sin(angle + PI / 6);

  // Draw the arrowhead
  triangle(x2, y2, x3, y3, x4, y4);
}

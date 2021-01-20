class MouseControls {
  constructor(canvasEl) {
    canvasEl.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    this.position = { x: 0, y: 0 };
  }

  handleMouseMove(e) {
    console.log(e);
    const { offsetY } = e;
    console.log("offsetY", offsetY);
    this.position.y = offsetY;
  }

  get y() {
    return this.position.y;
  }
}

export default MouseControls;

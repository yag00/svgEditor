"use strict";
import $ from "jquery";
import Point from "./Point";
import { createSvgShape, updateSvgShape } from "redux/actions/svgActions";
import store from "redux/store";

export default class PathManager {
  constructor(options) {
    const opts = options || {};

    this.setup = this.setup.bind(this);
    this.initListners = this.initListners.bind(this);
    this.teardown = this.teardown.bind(this);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    this.createPoint = this.createPoint.bind(this);

    this.onBegin = opts.onBegin;
    this.onEnd = opts.onEnd;
  }

  setup() {
    this.svgContainer = $("#svgBackground");
    this.points = [];
    this.initListners();
  }
  teardown() {
    console.log(this.points);
    this.points = [];

    this.svgContainer[0].removeEventListener("mousedown", this.handleMouseDown);
    this.svgContainer[0].removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);

    //this.svgContainer[0].removeEventListener("touchstart",this.handleTouchStart );
    this.svgContainer[0].removeEventListener("touchmove", this.handleTouchMove);
    this.svgContainer[0].removeEventListener("touchend", this.handleTouchEnd);
  }

  initListners() {
    this.mouseButtonDown = false;

    this.svgContainer[0].addEventListener("mousedown", this.handleMouseDown);
    this.svgContainer[0].addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);

    this.svgContainer[0].addEventListener("touchstart", this.handleTouchStart);
    this.svgContainer[0].addEventListener("touchmove", this.handleTouchMove);
    this.svgContainer[0].addEventListener("touchend", this.handleTouchEnd);
  }

  handleMouseDown(event) {
    let { selectedToolLeft } = store.getState().svg;
    if (
      event.currentTarget.id != "svgBackground" || selectedToolLeft == "select"
    ) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
    if (event.which === 1) {
      this.mouseButtonDown = true;
      this.beginPath(event);

      if (typeof this.onBegin === "function") {
        this.onBegin(event);
      }
    }
  }
  handleMouseMove(event) {
    if (event.which === 1 && this.mouseButtonDown) {
      this.updatePath(event);
    }
  }

  handleMouseUp(event) {
    if (event.which === 1 && this.mouseButtonDown) {
      this.mouseButtonDown = false;
      this.updatePath(event);
      //this.teardown();
      if (typeof this.onEnd === "function") {
        this.onEnd(event);
      }
    }
  }
  handleTouchStart(event) {
    // TODO implement
  }
  handleTouchMove(event) {
    // TODO implement
  }
  handleTouchEnd(event) {
    // TODO implement
  }
  beginPath(event) {
    const startPoint = this.createPoint(event.clientX, event.clientY);
    store.dispatch(createSvgShape(startPoint));
  }

  updatePath(event) {
    const point = this.createPoint(event.clientX, event.clientY);
    store.dispatch(updateSvgShape(point));
  }

  createPoint(x, y) {
    const rect = this.svgContainer[0].getBoundingClientRect();
    return new Point(x - rect.left, y - rect.top);
  }

  addPoint(point) {
    if (this.mouseButtonDown) {
      this.points.push(point);
    }
  }
}

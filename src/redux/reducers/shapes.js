import { List } from "immutable";
import * as shortid from "shortid";
import { Svg, Circle, Rectangle } from "units";
import * as constants from "../constants/ActionTypes";
import * as colors from "data/colors";

const update = (state, mutations) => Object.assign({}, state, mutations);

const initSvg = new Svg({ name: "svg", expanded: true, children: List([]) });
const circle = new Circle({
  name: "circle" + "_" + shortid.generate(),
  cx: 50,
  cy: 40,
  r: 10,
  fill: colors.ACACIA,
  children: List([])
});
const rectangle = new Rectangle({
  ame: "rectangle" + "_" + shortid.generate(),
  x: 60,
  y: 10,
  width: 30,
  height: 30,
  fill: colors.ACACIA,
  children: List([])
});
const circle2 = new Circle({
  name: "circle" + "_" + shortid.generate(),
  cx: 10,
  cy: 10,
  r: 10,
  fill: colors.LILAS,
  children: List([])
});
const svg = initSvg.addChild(circle).addChild(circle2).addChild(rectangle);

const initialState = {
  svg,
  selectedItem: circle2
};

export default function toolbar(state = initialState, action = {}) {
  switch (action.type) {
    case constants.SELECT_ITEM:
      return update(state, { selectedItem: action.item });
    default:
      return state;
  }
}

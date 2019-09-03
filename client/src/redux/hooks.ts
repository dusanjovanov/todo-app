import {
  TypedUseSelectorHook,
  useDispatch as udo,
  useSelector as uso
} from "react-redux";
import { Dispatch } from "redux";
import { State } from "./reducer";
import { RootAction } from "./actionTypes";

export const useSelector: TypedUseSelectorHook<State> = uso;
export const useDispatch = () => udo<Dispatch<RootAction>>();

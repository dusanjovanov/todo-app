import * as Actions from "./actionCreators";
import { ActionType } from "typesafe-actions";

export type RootAction = ActionType<typeof Actions>;

/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";
import { ICommonStore } from "../../interfaces";

const update = (
  common: ICommonStore,
  { payload }: PayloadAction<ICommonStore>
) => (common = payload);

export { update };

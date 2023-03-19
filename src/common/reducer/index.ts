import { commonReducer, commonActions } from "./common";
// import { courseReducer, courseActions } from "./course";
// import { coursesReducer, coursesActions, selectCourses } from "./courses";
import {
  coursesMetadataReducer,
  coursesMetadataActions,
} from "./coursesMetadata";
import { coursesApi } from "../../services";

const reducer = {
  common: commonReducer,
  coursesMetadata: coursesMetadataReducer,
  [coursesApi.reducerPath]: coursesApi.reducer,
};

export { reducer, commonActions, coursesMetadataActions };

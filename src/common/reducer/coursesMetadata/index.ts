import { createSlice } from "@reduxjs/toolkit";
import { ICoursesMetadata } from "../../interfaces";
import {
  setCourseMetadata,
  addCourseMetadata,
  setActiveCourse,
  setActiveLesson,
  updateLessonPosition,
  updateCourseMetadata,
  setNewPage,
} from "./reducer";

const initialState = {
  courses: {},
  page: 0,
} as ICoursesMetadata;

const coursesMetadata = createSlice({
  name: "coursesMetadata",
  initialState,
  reducers: {
    setCourseMetadata,
    addCourseMetadata,
    setActiveCourse,
    setActiveLesson,
    updateCourseMetadata,
    updateLessonPosition,
    setNewPage,
  },
});

const coursesMetadataReducer = coursesMetadata.reducer;
const coursesMetadataActions = coursesMetadata.actions;

type TCoursesMetadataActions = typeof coursesMetadataActions;

export { initialState, coursesMetadataReducer, coursesMetadataActions };

export type { TCoursesMetadataActions };

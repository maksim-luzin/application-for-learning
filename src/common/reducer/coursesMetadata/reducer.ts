import { PayloadAction } from "@reduxjs/toolkit";
import { NewMetadataCourse } from "../../../helpers/course";
import {
  ICourse,
  ICoursesMetadata,
  IUpdateLessonPosition,
} from "../../interfaces";

const addCourseMetadata = (
  coursesMetadata: ICoursesMetadata,
  { payload }: PayloadAction<ICourse>
) => ({
  page: coursesMetadata.page,
  currentCourse: payload.id,
  courses: {
    ...coursesMetadata.courses,
    [payload.id]: { ...new NewMetadataCourse(payload) },
  },
});

const setCourseMetadata = (
  coursesMetadata: ICoursesMetadata,
  { payload }: PayloadAction<ICoursesMetadata>
) => ({ ...payload });

const setActiveCourse = (
  coursesMetadata: ICoursesMetadata,
  { payload }: PayloadAction<string>
) => ({
  ...coursesMetadata,
  currentCourse: payload,
});

const setActiveLesson = (
  coursesMetadata: ICoursesMetadata,
  { payload }: PayloadAction<string>
) => {
  coursesMetadata.courses[coursesMetadata.currentCourse].currentLesson =
    payload;
};

const updateCourseMetadata = (
  coursesMetadata: ICoursesMetadata,
  { payload }: PayloadAction<ICourse>
) => {
  coursesMetadata.courses[payload.id] = new NewMetadataCourse(payload);
};

const updateLessonPosition = (
  coursesMetadata: ICoursesMetadata,
  { payload }: PayloadAction<IUpdateLessonPosition>
) => {
  coursesMetadata.courses[payload.course].lessons[payload.lesson] =
    payload.position;
};

const setNewPage = (
  coursesMetadata: ICoursesMetadata,
  { payload }: PayloadAction<number>
) => {
  coursesMetadata.page = payload;
};

export {
  setCourseMetadata,
  addCourseMetadata,
  setActiveCourse,
  setActiveLesson,
  updateCourseMetadata,
  updateLessonPosition,
  setNewPage,
};

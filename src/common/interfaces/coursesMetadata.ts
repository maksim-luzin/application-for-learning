import { ICourseMetadata } from "./courseMetadata";

interface ICoursesMetadata {
  currentCourse: string;
  page: number;
  courses: ICourseMetadata;
}

export type { ICoursesMetadata };

import { createBrowserRouter } from "react-router-dom";
import { Paths } from "./enums";
import { CoursesPreview } from '../pages/courses/containers';
import { CourseWrapper } from '../pages/course/containers';

const router = createBrowserRouter([
  {
    path: Paths.Courses,
    element: < CoursesPreview />,
  },
  {
    path: Paths.Course + ':id',
    element: <CourseWrapper />,
  },
]);

export { router }
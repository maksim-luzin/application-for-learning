// import { CourseStatus } from "../enums/index";

interface ICoursePreview {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  lessonsCount: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: {
    slug: string;
    skills?: string[];
    courseVideoPreview?: {
      link: string;
      duration: number;
      previewImageLink: string;
    };
    fullCourseProductId?: string;
    fullCourseProductFamily?: string;
  };
}

export type { ICoursePreview };

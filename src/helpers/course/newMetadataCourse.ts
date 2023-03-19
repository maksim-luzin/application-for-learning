import { ICourse } from "../../common/interfaces";

class NewMetadataCourse {
  id: string;
  currentLesson: string;
  lessons: { [index: string]: number };
  static currentLesson: string;
  static lessons: any;

  constructor(course: ICourse) {
    this.id = course.id;
    this.currentLesson = course.lessons[0].id;
    const lessons = {};
    course.lessons.forEach((lesson) =>
      Object.assign(lessons, { [lesson.id]: 0 })
    );

    this.lessons = lessons;
  }
}

type TCourseMetadata = typeof NewMetadataCourse;

export { NewMetadataCourse };
export type { TCourseMetadata };

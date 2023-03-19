import { FC } from 'react';
import { Link } from 'react-router-dom';
import { VideoPlayer } from '../../../../common/components';
import { LessonPreview } from '../../components';
import { useTypedSelector } from '../../../../common/hooks';
import { Paths } from '../../../../common/enums';
import { ICourse, ILesson } from '../../../../common/interfaces';

import styles from './styles.module.scss';

interface ICourseViewProps {
  course: ICourse;
}

const CourseView: FC<ICourseViewProps> = ({ course }) => {
  const courseMetadata = useTypedSelector(({ coursesMetadata: metadata }) => metadata.courses[course.id]);
  const currentLessonPosition = courseMetadata.lessons[courseMetadata.currentLesson]

  const currentLesson = course.lessons.find(({ id }) => (id === courseMetadata?.currentLesson)) as ILesson;

  const poster = `${currentLesson.previewImageLink}/lesson-${currentLesson.order}.webp`
  const lessons = [...course.lessons]

  return (
    <>
      <header className={styles['course-view__header']}>
        <div>
          <h1 className={styles['course-view__title']}>{course.title}</h1>
          <div className={styles['course-view__description']}>{course.description}</div>
        </div>
        <Link to={Paths.Courses}>&gt;</Link>
      </header>
      <div className={styles['course-view__wrapper']}>
        <main className={styles['course-view__lesson']}>
          <VideoPlayer
            src={currentLesson.link}
            poster={poster}
            position={currentLessonPosition}
            course={course.id}
            lesson={courseMetadata.currentLesson}
          />
          <div className={styles['course-view__current-lesson']}>
            Lesson {currentLesson.order} {currentLesson.title}
          </div>
        </main>
        <aside className={styles['course-view__lessons']}>
          {
            lessons
              .sort((l1, l2) => l1.order - l2.order)
              .map(lesson => (
                <LessonPreview lesson={lesson} key={lesson.id} />
              ))
          }
        </aside>
      </div>
    </>
  )
};

export { CourseView };

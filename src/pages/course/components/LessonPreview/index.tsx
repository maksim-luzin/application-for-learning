import { FC, memo } from 'react';
import Card from 'react-bootstrap/Card';
import { useTypedDispatch } from '../../../../common/hooks';
import { ILesson } from '../../../../common/interfaces';
import { coursesMetadataActions } from '../../../../common/reducer';

import styles from './styles.module.scss';

interface ICoursePreviewProps {
  lesson: ILesson
}


const LessonPreview: FC<ICoursePreviewProps> = memo(({ lesson }) => {
  const dispatch = useTypedDispatch();
  const isLooked = lesson.status === "locked"

  const setThisLesson = () => {
    if (isLooked) return;
    dispatch(coursesMetadataActions.setActiveLesson(lesson.id));
  }
  return (
    <div
      className={styles['lesson-preview__wrapper']}
      onClick={setThisLesson}
    >
      <Card style={{ cursor: isLooked ? 'not-allowed' : 'pointer' }}>
        <Card.Img
          variant="top"
          src={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`}
          className={styles['lesson-preview__image']}
          style={{ filter: isLooked ? 'blur(4px)' : 'blur(0)' }}
        />
        <Card.Body>
          <Card.Text>Lesson {lesson.order}</Card.Text>
          <Card.Title className={styles['lesson-preview__title']}>{lesson.title}</Card.Title>
        </Card.Body>
      </Card >
    </div>
  )
})

export { LessonPreview };

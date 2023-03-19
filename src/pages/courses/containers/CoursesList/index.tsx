import { FC, memo, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { CoursePreview } from '../../components';
import { ICoursesPreview } from '../../../../common/interfaces';
import { useTypedDispatch, useTypedSelector } from '../../../../common/hooks';
import { coursesMetadataActions } from '../../../../common/reducer';
import { storage } from '../../../../common/data';

import styles from './styles.module.scss';

const CoursesList: FC<ICoursesPreview> = memo(({ courses }) => {
  const dispatch = useTypedDispatch();
  const limit = 10;
  const lastPage = Math.floor(courses.length / limit)
  const currentPageNumber = useTypedSelector(({ coursesMetadata }) => coursesMetadata.page);
  const metadata = useTypedSelector(({ coursesMetadata }) => coursesMetadata);

  const currentPage = courses.slice(limit * currentPageNumber, limit * (currentPageNumber + 1))

  const setFirstPage = () => {
    dispatch(coursesMetadataActions.setNewPage(0))
  }

  const setNextPage = () => {
    if (currentPageNumber < lastPage) {
      dispatch(coursesMetadataActions.setNewPage(currentPageNumber + 1))
    }
  }

  const setPreviewPage = () => {
    if (currentPageNumber > 0) {
      dispatch(coursesMetadataActions.setNewPage(currentPageNumber - 1))
    }
  }

  const setLastPage = () => {
    dispatch(coursesMetadataActions.setNewPage(lastPage))
  }

  useEffect(() => {
    storage.update(metadata);
  }, [metadata])

  return (
    <>
      <h1 className={styles['courses-preview__header']}>
        These courses are just for you
      </h1>
      <main className={styles['courses-preview__container']}>
        {
          currentPage.map(course => (
            <CoursePreview course={course} key={course.id}></CoursePreview>
          ))
        }
      </main>
      <Pagination size="sm" className={styles['courses-preview__pagination']}>
        <Pagination.First onClick={setFirstPage} />
        <Pagination.Prev onClick={setPreviewPage} />
        <Pagination.Item>{currentPageNumber + 1}</Pagination.Item>
        <Pagination.Next onClick={setNextPage} />
        <Pagination.Last onClick={setLastPage} />
      </Pagination>
    </>
  )
})

export { CoursesList };

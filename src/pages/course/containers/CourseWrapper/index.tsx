import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CourseView } from '../CourseView';
import { Loader } from '../../../../common/components';
import { useGetCourseByIdQuery } from '../../../../services';
import { ICourse } from '../../../../common/interfaces';
import { useTypedDispatch, useTypedSelector } from '../../../../common/hooks';
import { commonActions, coursesMetadataActions } from '../../../../common/reducer';

const CourseWrapper = () => {
  const dispatch = useTypedDispatch();
  const { id } = useParams() as { id: string };
  const courseMetadata = useTypedSelector(({ coursesMetadata: metadata }) => metadata.courses[id]);
  const { data, isLoading, isError } = useGetCourseByIdQuery(id as string);

  useEffect(() => {
    if (courseMetadata) {
      dispatch(coursesMetadataActions.setActiveCourse(id));
    } else if (data) {
      dispatch(coursesMetadataActions.addCourseMetadata(data as ICourse));
    }
  }, [courseMetadata, data, dispatch, id])

  useEffect(() => {
    if (isError) {
      dispatch(commonActions.update({ isLoading: false, error: 'Network Error' }));
    }
  }, [isError, dispatch])


  if (isLoading || isError || !courseMetadata) return <Loader />

  return <CourseView course={data as ICourse} />
};

export { CourseWrapper };

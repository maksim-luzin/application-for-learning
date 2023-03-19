import { CoursesList } from '../CoursesList';
import { Loader } from '../../../../common/components';
import { useGetCoursesQuery } from '../../../../services';
import { ICoursePreview } from '../../../../common/interfaces';
import { useTypedDispatch } from '../../../../common/hooks';
import { commonActions } from '../../../../common/reducer';

const CoursesPreview = () => {
  const dispatch = useTypedDispatch();
  const { data, isLoading, isError } = useGetCoursesQuery();

  if (isError) {
    dispatch(commonActions.update({ isLoading: false, error: 'Loading courses error' }))
  };

  if (isLoading || isError) return <Loader />

  return <CoursesList courses={data?.courses as ICoursePreview[]} />
}

export { CoursesPreview };

import { FC, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import StarRatings from 'react-star-ratings';
import { Link } from "react-router-dom";
import { VideoPlayerPreview } from '../../../../common/components';
import { ICoursePreview } from '../../../../common/interfaces';
import { Paths } from '../../../../common/enums';

import styles from './styles.module.scss';

interface ICoursePreviewProps {
  course: ICoursePreview
}


const CoursePreview: FC<ICoursePreviewProps> = ({ course }) => {
  const [isVideoPreview, setVideoPreview] = useState(false);
  const skills = !course.meta.skills ? [] : [...course.meta.skills].sort();

  const onVideoPreview = () => {
    if (!course.meta.courseVideoPreview) return;
    setVideoPreview(true);
  }

  const offVideoPreview = () => {
    if (!course.meta.courseVideoPreview) return;
    setVideoPreview(false);
  }

  return (
    <Link
      to={Paths.Course + course.id}
      className={styles['course-preview__wrapper']}
      onMouseEnter={onVideoPreview}
      onMouseLeave={offVideoPreview}
    >
      <Card>
        {
          isVideoPreview
            ? (
              <div className={styles['course-preview__image']}>
                <VideoPlayerPreview
                  src={course.meta.courseVideoPreview?.link as string}
                  poster={course.meta.courseVideoPreview?.previewImageLink as string}
                />
              </div>
            )
            : (
              <Card.Img
                variant="top"
                src={course.previewImageLink + '/cover.webp'}
                className={styles['course-preview__image']}
              />
            )
        }
        <Card.Body>
          <Card.Title className={styles['course-preview__title']}>{course.title}</Card.Title>
          <StarRatings
            rating={course.rating}
            starRatedColor="gold"
            numberOfStars={5}
            name='rating'
            starDimension="20px"
          />
          <Card.Text className={styles['course-preview__skills']}>
            {
              skills.map(skill => (
                <li key={skill}>
                  <Badge bg="info" key={skill}>{skill}</Badge>
                </li>
              ))
            }
          </Card.Text>
        </Card.Body>
      </Card >
    </Link>
  )
};

export { CoursePreview };

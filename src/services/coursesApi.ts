import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICoursesPreview, ICourse } from "../common/interfaces";
import { RequestURL, CourseURL } from "../common/constants";
import { storageJsonWebToken } from "../helpers/auth";

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: RequestURL + CourseURL,
    prepareHeaders: (headers, { getState }) => {
      headers.set("authorization", storageJsonWebToken.get() as string);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCourseById: builder.query<ICourse, string>({
      query: (id) => `/${id}`,
    }),
    getCourses: builder.query<ICoursesPreview, void>({
      query: () => "/",
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseByIdQuery } = coursesApi;

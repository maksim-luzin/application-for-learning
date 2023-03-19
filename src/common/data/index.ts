import { ICoursesMetadata } from "../interfaces";

class LocalStorage {
  dbName: string;
  constructor(dbName: string) {
    this.dbName = dbName;
  }

  update(coursesMetadata: ICoursesMetadata) {
    const value = JSON.stringify(coursesMetadata);
    localStorage.setItem(this.dbName, value);
  }

  get(): ICoursesMetadata {
    const value = localStorage.getItem(this.dbName);
    const coursesMetadata = value
      ? (JSON.parse(value as string) as ICoursesMetadata)
      : ({
          courses: {},
          page: 0,
        } as ICoursesMetadata);

    return coursesMetadata;
  }
}

const storage = new LocalStorage("coursesMetadata");

export { storage };

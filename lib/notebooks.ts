/**
 * First-party notebooks published by the Learning Hub repository.
 * The file names are an explicit allowlist; never accept arbitrary paths
 * from route parameters when embedding a notebook.
 */
export const learningNotebooks = [
  {
    courseId: "data-analytics",
    file: "session-02-python-basics.ipynb",
    title: "Buổi 02 · Python cơ bản",
    lessonIds: ["python-data-types", "python-control-flow"],
    preview: false,
  },
  {
    courseId: "data-analytics",
    file: "session-03-pandas.ipynb",
    title: "Buổi 03 · Pandas, Series, DataFrame",
    lessonIds: ["pandas-series", "pandas-dataframe", "data-inspection"],
    preview: false,
  },
  {
    courseId: "data-analytics",
    file: "session-04-preprocessing.ipynb",
    title: "Buổi 04 · Làm sạch và chuẩn hóa",
    lessonIds: ["missing-values", "data-formatting", "min-max-normalization", "z-score-standardization", "binning-categories", "one-hot-encoding"],
    preview: false,
  },
  {
    courseId: "data-analytics",
    file: "session-05-matplotlib.ipynb",
    title: "Buổi 05 · Matplotlib",
    lessonIds: ["visualization-principles", "matplotlib-pyplot", "pandas-plotting"],
    preview: false,
  },
  {
    courseId: "data-analytics",
    file: "preview-lesson-04-visualization.ipynb",
    title: "Đọc trước Bài 04 · Công cụ trực quan",
    lessonIds: ["visualization-workflow", "histogram-bar-pie", "boxplot-scatter", "wordcloud-waffle-dashboard"],
    preview: true,
  },
  {
    courseId: "data-analytics",
    file: "preview-lesson-05-eda.ipynb",
    title: "Đọc trước Bài 05 · EDA",
    lessonIds: ["eda-descriptive-statistics", "dispersion-and-boxplot", "skewness-kurtosis-outliers", "correlation-pearson", "groupby-anova"],
    preview: true,
  },
  {
    courseId: "data-analytics",
    file: "preview-lesson-06-models.ipynb",
    title: "Đọc trước Bài 06 · Phát triển mô hình",
    lessonIds: ["regression-basics", "regression-diagnostics", "polynomial-pipeline", "mse-r2-model-metrics"],
    preview: true,
  },
  {
    courseId: "data-analytics",
    file: "preview-lesson-07-evaluation.ipynb",
    title: "Đọc trước Bài 07 · Đánh giá mô hình",
    lessonIds: ["train-test-cross-validation", "underfit-overfit", "ridge-regularization", "grid-search-model-selection"],
    preview: true,
  },
] as const;

export function notebookUrl(courseId: string, file: string) {
  return `/courses/${courseId}/notebooks/${encodeURIComponent(file)}`;
}

export function notebooksForCourse(courseId: string) {
  return learningNotebooks.filter((notebook) => notebook.courseId === courseId);
}

export function notebooksForLesson(courseId: string, lessonId: string) {
  return notebooksForCourse(courseId).filter((notebook) =>
    (notebook.lessonIds as readonly string[]).includes(lessonId)
  );
}

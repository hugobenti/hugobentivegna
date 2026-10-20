export interface IReviewFrame {
  /** Index of the stage reached (-1 before the draft lands). */
  stage: number;
  /** The draft's lines are marked removed. */
  removed: boolean;
  /** The new line has landed and the comment is resolved. */
  fixed: boolean;
  checksPassed: number;
}

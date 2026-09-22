import EditorialImage from './EditorialImage.astro';
import Gallery from './Gallery.astro';
import { Aside, Callout, Code, Compare, Experiment, Observation, OpenQuestions, OriginalScope, OutOfScope, Question, Result } from './EditorialBlocks';

export const editorialComponents = {
  Image: EditorialImage,
  Gallery,
  Compare,
  Question,
  Experiment,
  Result,
  Observation,
  Aside,
  Callout,
  Code,
  OriginalScope,
  OutOfScope,
  OpenQuestions,
};

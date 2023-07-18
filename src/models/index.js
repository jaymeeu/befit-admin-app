// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Gender = {
  "MALE": "MALE",
  "FEMALE": "FEMALE"
};

const Level = {
  "BASIC": "BASIC",
  "INTERMEDIATE": "INTERMEDIATE",
  "ADVANCED": "ADVANCED"
};

const { Progress, User, Workout, Exercise } = initSchema(schema);

export {
  Progress,
  User,
  Workout,
  Exercise,
  Gender,
  Level
};
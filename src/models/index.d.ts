import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export enum Level {
  BASIC = "BASIC",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED"
}



type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email: string;
  readonly age?: number | null;
  readonly height?: string | null;
  readonly weight?: string | null;
  readonly workouts?: (Workout | null)[] | null;
  readonly sub: string;
  readonly gender?: Gender | keyof typeof Gender | null;
  readonly isAdmin: boolean;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email: string;
  readonly age?: number | null;
  readonly height?: string | null;
  readonly weight?: string | null;
  readonly workouts: AsyncCollection<Workout>;
  readonly sub: string;
  readonly gender?: Gender | keyof typeof Gender | null;
  readonly isAdmin: boolean;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerWorkout = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Workout, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly duration: number;
  readonly caloriesBurned: number;
  readonly exercises?: Exercise[] | null;
  readonly userID: string;
  readonly level: Level | keyof typeof Level;
  readonly progress?: number | null;
  readonly expectedResult?: (string | null)[] | null;
  readonly focus?: (string | null)[] | null;
  readonly days_completed?: number | null;
  readonly image: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkout = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Workout, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly duration: number;
  readonly caloriesBurned: number;
  readonly exercises: AsyncCollection<Exercise>;
  readonly userID: string;
  readonly level: Level | keyof typeof Level;
  readonly progress?: number | null;
  readonly expectedResult?: (string | null)[] | null;
  readonly focus?: (string | null)[] | null;
  readonly days_completed?: number | null;
  readonly image: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Workout = LazyLoading extends LazyLoadingDisabled ? EagerWorkout : LazyWorkout

export declare const Workout: (new (init: ModelInit<Workout>) => Workout) & {
  copyOf(source: Workout, mutator: (draft: MutableModel<Workout>) => MutableModel<Workout> | void): Workout;
}

type EagerExercise = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Exercise, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly sets: number;
  readonly reps: number;
  readonly duration: number;
  readonly workoutID: string;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyExercise = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Exercise, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly sets: number;
  readonly reps: number;
  readonly duration: number;
  readonly workoutID: string;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Exercise = LazyLoading extends LazyLoadingDisabled ? EagerExercise : LazyExercise

export declare const Exercise: (new (init: ModelInit<Exercise>) => Exercise) & {
  copyOf(source: Exercise, mutator: (draft: MutableModel<Exercise>) => MutableModel<Exercise> | void): Exercise;
}

type EagerAchievement = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Achievement, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly earnedDate: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAchievement = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Achievement, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly earnedDate: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Achievement = LazyLoading extends LazyLoadingDisabled ? EagerAchievement : LazyAchievement

export declare const Achievement: (new (init: ModelInit<Achievement>) => Achievement) & {
  copyOf(source: Achievement, mutator: (draft: MutableModel<Achievement>) => MutableModel<Achievement> | void): Achievement;
}
/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Workout } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type WorkoutUpdateFormInputValues = {
    title?: string;
    description?: string;
    duration?: number;
    caloriesBurned?: number;
    level?: string;
    expectedResult?: string[];
    focus?: string[];
    image?: string;
    exercises?: string[];
};
export declare type WorkoutUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    duration?: ValidationFunction<number>;
    caloriesBurned?: ValidationFunction<number>;
    level?: ValidationFunction<string>;
    expectedResult?: ValidationFunction<string>;
    focus?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    exercises?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WorkoutUpdateFormOverridesProps = {
    WorkoutUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    duration?: PrimitiveOverrideProps<TextFieldProps>;
    caloriesBurned?: PrimitiveOverrideProps<TextFieldProps>;
    level?: PrimitiveOverrideProps<SelectFieldProps>;
    expectedResult?: PrimitiveOverrideProps<TextFieldProps>;
    focus?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    exercises?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WorkoutUpdateFormProps = React.PropsWithChildren<{
    overrides?: WorkoutUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    workout?: Workout;
    onSubmit?: (fields: WorkoutUpdateFormInputValues) => WorkoutUpdateFormInputValues;
    onSuccess?: (fields: WorkoutUpdateFormInputValues) => void;
    onError?: (fields: WorkoutUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WorkoutUpdateFormInputValues) => WorkoutUpdateFormInputValues;
    onValidate?: WorkoutUpdateFormValidationValues;
} & React.CSSProperties>;
export default function WorkoutUpdateForm(props: WorkoutUpdateFormProps): React.ReactElement;

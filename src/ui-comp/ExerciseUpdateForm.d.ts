/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Exercise } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ExerciseUpdateFormInputValues = {
    name?: string;
    sets?: number;
    reps?: number;
    duration?: number;
    image?: string;
};
export declare type ExerciseUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    sets?: ValidationFunction<number>;
    reps?: ValidationFunction<number>;
    duration?: ValidationFunction<number>;
    image?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ExerciseUpdateFormOverridesProps = {
    ExerciseUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    sets?: PrimitiveOverrideProps<TextFieldProps>;
    reps?: PrimitiveOverrideProps<TextFieldProps>;
    duration?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ExerciseUpdateFormProps = React.PropsWithChildren<{
    overrides?: ExerciseUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    exercise?: Exercise;
    onSubmit?: (fields: ExerciseUpdateFormInputValues) => ExerciseUpdateFormInputValues;
    onSuccess?: (fields: ExerciseUpdateFormInputValues) => void;
    onError?: (fields: ExerciseUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ExerciseUpdateFormInputValues) => ExerciseUpdateFormInputValues;
    onValidate?: ExerciseUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ExerciseUpdateForm(props: ExerciseUpdateFormProps): React.ReactElement;

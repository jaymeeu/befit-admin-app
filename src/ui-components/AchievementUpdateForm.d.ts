/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Achievement } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AchievementUpdateFormInputValues = {
    name?: string;
    description?: string;
    earnedDate?: string;
};
export declare type AchievementUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    earnedDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AchievementUpdateFormOverridesProps = {
    AchievementUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    earnedDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AchievementUpdateFormProps = React.PropsWithChildren<{
    overrides?: AchievementUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    achievement?: Achievement;
    onSubmit?: (fields: AchievementUpdateFormInputValues) => AchievementUpdateFormInputValues;
    onSuccess?: (fields: AchievementUpdateFormInputValues) => void;
    onError?: (fields: AchievementUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AchievementUpdateFormInputValues) => AchievementUpdateFormInputValues;
    onValidate?: AchievementUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AchievementUpdateForm(props: AchievementUpdateFormProps): React.ReactElement;

/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AchievementCreateFormInputValues = {
    name?: string;
    description?: string;
    earnedDate?: string;
};
export declare type AchievementCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    earnedDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AchievementCreateFormOverridesProps = {
    AchievementCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    earnedDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AchievementCreateFormProps = React.PropsWithChildren<{
    overrides?: AchievementCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AchievementCreateFormInputValues) => AchievementCreateFormInputValues;
    onSuccess?: (fields: AchievementCreateFormInputValues) => void;
    onError?: (fields: AchievementCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AchievementCreateFormInputValues) => AchievementCreateFormInputValues;
    onValidate?: AchievementCreateFormValidationValues;
} & React.CSSProperties>;
export default function AchievementCreateForm(props: AchievementCreateFormProps): React.ReactElement;

/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Exercise } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore, Storage } from "aws-amplify";
export default function ExerciseCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    onAddSuccess,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    sets: "",
    reps: "",
    duration: "",
    image: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [sets, setSets] = React.useState(initialValues.sets);
  const [reps, setReps] = React.useState(initialValues.reps);
  const [duration, setDuration] = React.useState(initialValues.duration);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setSets(initialValues.sets);
    setReps(initialValues.reps);
    setDuration(initialValues.duration);
    setImage(initialValues.image);
    setErrors({});
  };

  const [image, setimage] = React.useState({});

  const convertToSlug = (input) => {
    let slug = input.toLowerCase();
    slug = slug.replace(/[^\w\s-]/g, "");
    slug = slug.replace(/\s+/g, "-");
    slug = slug.replace(/--+/g, "-");
    slug = slug.replace(/^-+|-+$/g, "");
    const randomString = Math.random().toString(36).substring(2, 6);
    const finalSlug = `${slug}-${randomString}`;
    return finalSlug;
  };

  const validations = {
    name: [{ type: "Required" }],
    sets: [{ type: "Required" }],
    reps: [{ type: "Required" }],
    duration: [{ type: "Required" }],
    image: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px 0"
      onSubmit={async (event) => {
        event.preventDefault();
        if (!image?.name) return alert("Image is required!");

        const imageKey = convertToSlug(name);

        let modelFields = {
          name,
          sets,
          reps,
          duration,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });

          await Storage.put(imageKey, image);

          const url = `${process.env.REACT_APP_S3_URL}/${imageKey}`

          modelFields.image = url

          await DataStore.save(new Exercise(modelFields));
          onAddSuccess()

          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ExerciseCreateForm")}
      {...rest}
    >
      <TextField
        label="Exercise name"
        isRequired={true}
        isReadOnly={false}
        placeholder="Enter exercise name"
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              sets,
              reps,
              duration,
              image,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>


      <TextField
        label="Reps"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        placeholder="Enter number of reps"
        value={reps}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              sets,
              reps: value,
              duration,
              image,
            };
            const result = onChange(modelFields);
            value = result?.reps ?? value;
          }
          if (errors.reps?.hasError) {
            runValidationTasks("reps", value);
          }
          setReps(value);
        }}
        onBlur={() => runValidationTasks("reps", reps)}
        errorMessage={errors.reps?.errorMessage}
        hasError={errors.reps?.hasError}
        {...getOverrideProps(overrides, "reps")}
      ></TextField>

      <TextField
        label="Sets"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={sets}
              placeholder="Enter number of sets"

        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              sets: value,
              reps,
              duration,
              image,
            };
            const result = onChange(modelFields);
            value = result?.sets ?? value;
          }
          if (errors.sets?.hasError) {
            runValidationTasks("sets", value);
          }
          setSets(value);
        }}
        onBlur={() => runValidationTasks("sets", sets)}
        errorMessage={errors.sets?.errorMessage}
        hasError={errors.sets?.hasError}
        {...getOverrideProps(overrides, "sets")}
      ></TextField>

      <TextField
        label="Duration"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        placeholder="Enter estimate duration in seconds"
        value={duration}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              sets,
              reps,
              duration: value,
              image,
            };
            const result = onChange(modelFields);
            value = result?.duration ?? value;
          }
          if (errors.duration?.hasError) {
            runValidationTasks("duration", value);
          }
          setDuration(value);
        }}
        onBlur={() => runValidationTasks("duration", duration)}
        errorMessage={errors.duration?.errorMessage}
        hasError={errors.duration?.hasError}
        {...getOverrideProps(overrides, "duration")}
      ></TextField>

      <div className="relative ">
        <label
          htmlFor={"images"}
          className="leading-7 text-sm text-gray-600"
        >
          {" "}
          Exercise Gif Image{" "}
        </label>
        <input
          type={"file"}
          id={"images"}
          name={"images"}
          placeholder={"Enter exercise GIF image"}
          onChange={(e) => setimage(e.target.files[0])}
          accept="image/x-png,image/gif,image/jpeg,image/webp"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Add Exercise"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

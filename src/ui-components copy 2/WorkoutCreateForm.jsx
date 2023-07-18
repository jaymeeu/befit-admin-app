/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Exercise, Workout } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore, Storage } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);

  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };

  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function WorkoutCreateForm(props) {
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
    title: "",
    description: "",
    duration: "",
    caloriesBurned: "",
    level: "",
    expectedResult: [],
    focus: [],
    exercises: [],
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [duration, setDuration] = React.useState(initialValues.duration);
  const [caloriesBurned, setCaloriesBurned] = React.useState(
    initialValues.caloriesBurned
  );
  const [level, setLevel] = React.useState(initialValues.level);
  const [expectedResult, setExpectedResult] = React.useState(
    initialValues.expectedResult
  );
  const [focus, setFocus] = React.useState(initialValues.focus);
  const [image, setImage] = React.useState({});
  const [exercises, setExercises] = React.useState(initialValues.exercises);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setDuration(initialValues.duration);
    setCaloriesBurned(initialValues.caloriesBurned);
    setLevel(initialValues.level);
    setExpectedResult(initialValues.expectedResult);
    setCurrentExpectedResultValue("");
    setFocus(initialValues.focus);
    setCurrentFocusValue("");
    setImage({});
    setExercises(initialValues.exercises);
    setCurrentExercisesValue("");
    setErrors({});
  };
  const [currentExpectedResultValue, setCurrentExpectedResultValue] =
    React.useState("");
  const expectedResultRef = React.createRef();
  const [currentFocusValue, setCurrentFocusValue] = React.useState("");
  const focusRef = React.createRef();
  const [currentExercisesValue, setCurrentExercisesValue] = React.useState("");
  const exercisesRef = React.createRef();
  const validations = {
    title: [{ type: "Required" }],
    description: [],
    duration: [{ type: "Required" }],
    caloriesBurned: [],
    level: [{ type: "Required" }],
    expectedResult: [],
    focus: [],
    exercises: [],
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

  const [allExercises, setAllExercises] = React.useState([])
  
  const fetchExercise = async () =>{
    try {
      const res = await DataStore.query(Exercise)
      setAllExercises(res)
    }
    catch(err){

    }
  }

  React.useEffect(() => {
    fetchExercise()
  }, []);

  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        if (!image?.name) { return alert('Image is required !') }

        const imageKey = convertToSlug(name);

        let modelFields = {
          title,
          description,
          duration,
          caloriesBurned,
          level,
          expectedResult,
          focus,
          exercises,
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

          await DataStore.save(new Workout(modelFields))
            .then(() => {
              onAddSuccess()
            })
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
      {...getOverrideProps(overrides, "WorkoutCreateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              description,
              duration,
              caloriesBurned,
              level,
              expectedResult,
              focus,
              exercises,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description: value,
              duration,
              caloriesBurned,
              level,
              expectedResult,
              focus,
              exercises,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Duration"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={duration}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              description,
              duration: value,
              caloriesBurned,
              level,
              expectedResult,
              focus,
              exercises,
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
      <TextField
        label="Calories burned"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={caloriesBurned}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              description,
              duration,
              caloriesBurned: value,
              level,
              expectedResult,
              focus,
              exercises,
            };
            const result = onChange(modelFields);
            value = result?.caloriesBurned ?? value;
          }
          if (errors.caloriesBurned?.hasError) {
            runValidationTasks("caloriesBurned", value);
          }
          setCaloriesBurned(value);
        }}
        onBlur={() => runValidationTasks("caloriesBurned", caloriesBurned)}
        errorMessage={errors.caloriesBurned?.errorMessage}
        hasError={errors.caloriesBurned?.hasError}
        {...getOverrideProps(overrides, "caloriesBurned")}
      ></TextField>
      <SelectField
        label="Level"
        placeholder="Please select an option"
        isDisabled={false}
        value={level}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              duration,
              caloriesBurned,
              level: value,
              expectedResult,
              focus,
              exercises,
            };
            const result = onChange(modelFields);
            value = result?.level ?? value;
          }
          if (errors.level?.hasError) {
            runValidationTasks("level", value);
          }
          setLevel(value);
        }}
        onBlur={() => runValidationTasks("level", level)}
        errorMessage={errors.level?.errorMessage}
        hasError={errors.level?.hasError}
        {...getOverrideProps(overrides, "level")}
      >
        <option
          children="Basic"
          value="BASIC"
          {...getOverrideProps(overrides, "leveloption0")}
        ></option>
        <option
          children="Intermediate"
          value="INTERMEDIATE"
          {...getOverrideProps(overrides, "leveloption1")}
        ></option>
        <option
          children="Advanced"
          value="ADVANCED"
          {...getOverrideProps(overrides, "leveloption2")}
        ></option>
      </SelectField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              description,
              duration,
              caloriesBurned,
              level,
              expectedResult: values,
              focus,
              exercises,
            };
            const result = onChange(modelFields);
            values = result?.expectedResult ?? values;
          }
          setExpectedResult(values);
          setCurrentExpectedResultValue("");
        }}
        currentFieldValue={currentExpectedResultValue}
        label={"Expected result"}
        items={expectedResult}
        hasError={errors?.expectedResult?.hasError}
        errorMessage={errors?.expectedResult?.errorMessage}
        setFieldValue={setCurrentExpectedResultValue}
        inputFieldRef={expectedResultRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Expected result"
          isRequired={false}
          isReadOnly={false}
          value={currentExpectedResultValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.expectedResult?.hasError) {
              runValidationTasks("expectedResult", value);
            }
            setCurrentExpectedResultValue(value);
          }}
          onBlur={() =>
            runValidationTasks("expectedResult", currentExpectedResultValue)
          }
          errorMessage={errors.expectedResult?.errorMessage}
          hasError={errors.expectedResult?.hasError}
          ref={expectedResultRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "expectedResult")}
        ></TextField>


      </ArrayField>

      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              description,
              duration,
              caloriesBurned,
              level,
              expectedResult,
              focus: values,
              exercises,
            };
            const result = onChange(modelFields);
            values = result?.focus ?? values;
          }
          setFocus(values);
          setCurrentFocusValue("");
        }}
        currentFieldValue={currentFocusValue}
        label={"Focus"}
        items={focus}
        hasError={errors?.focus?.hasError}
        errorMessage={errors?.focus?.errorMessage}
        setFieldValue={setCurrentFocusValue}
        inputFieldRef={focusRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Focus"
          isRequired={false}
          isReadOnly={false}
          value={currentFocusValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.focus?.hasError) {
              runValidationTasks("focus", value);
            }
            setCurrentFocusValue(value);
          }}
          onBlur={() => runValidationTasks("focus", currentFocusValue)}
          errorMessage={errors.focus?.errorMessage}
          hasError={errors.focus?.hasError}
          ref={focusRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "focus")}
        ></TextField>
      </ArrayField>

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
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/x-png,image/gif,image/jpeg,image/webp"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              description,
              duration,
              caloriesBurned,
              level,
              expectedResult,
              focus,
              exercises: values,
            };
            const result = onChange(modelFields);
            values = result?.exercises ?? values;
          }
          setExercises(values);
          setCurrentExercisesValue("");
        }}
        currentFieldValue={currentExercisesValue}
        label={"Exercises"}
        items={exercises}
        hasError={errors?.exercises?.hasError}
        errorMessage={errors?.exercises?.errorMessage}
        setFieldValue={setCurrentExercisesValue}
        inputFieldRef={exercisesRef}
        defaultFieldValue={""}
      >

        <SelectField
          label="Exercises"
          isRequired={false}
          isReadOnly={false}
          value={currentExercisesValue}
          onChange={(e) => {

            let { value } = e.target;
            if (errors.exercises?.hasError) {
              runValidationTasks("exercises", value);
            }
            setCurrentExercisesValue(value);
          }}
          onBlur={() => runValidationTasks("exercises", currentExercisesValue)}
          errorMessage={errors.exercises?.errorMessage}
          hasError={errors.exercises?.hasError}
          ref={exercisesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "exercises")}
          placeholder="Please select an option"
          isDisabled={false}

        >
          {
            allExercises.map((exerc)=>(
              <option
              children={exerc?.name}
              value={exerc?.id}
            ></option>
            ))
          }
          
        </SelectField>



        {/* <TextField
          label="Exercises"
          isRequired={false}
          isReadOnly={false}
          value={currentExercisesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.exercises?.hasError) {
              runValidationTasks("exercises", value);
            }
            setCurrentExercisesValue(value);
          }}
          onBlur={() => runValidationTasks("exercises", currentExercisesValue)}
          errorMessage={errors.exercises?.errorMessage}
          hasError={errors.exercises?.hasError}
          ref={exercisesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "exercises")}
        ></TextField> */}

      </ArrayField>

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
            children="Submit"
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

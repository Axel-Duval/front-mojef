import { useEffect, useState } from "react";

interface FieldSpecif {
  default: any;
  validators: FieldValidator[];
}

interface FieldValidator {
  (value: any): null | object;
}

interface FormValidator {
  (values: { [key: string]: any }): null | any;
}

/**
 * @experimental
 */
export function useForm(
  formSpecif: { [key: string]: FieldSpecif | any },
  validators?: FormValidator[]
): [Record<string, any>, any] {
  const defaultFormValue = Object.entries(formSpecif).reduce(
    (previous, [key, specif]) => {
      previous[key] = typeof specif === "string" ? specif : specif.default;
      return previous;
    },
    {} as Record<string, any>
  );

  const [formData, setFormData] = useState<Record<string, any>>(
    defaultFormValue
  );
  const [errors, setErrors] = useState<Record<string, any>>({
    $form: { valid: false },
  });

  function getValidatorsForField(fieldName: string) {
    const specif = formSpecif[fieldName];
    if (typeof specif !== "object") {
      return [];
    }
    return specif.validators;
  }

  function computeValidators(
    validators: ((v: any) => object | null)[],
    v: any
  ) {
    return validators.reduce((previous, validator) => {
      const validatorResult = validator(v);
      return validatorResult
        ? Object.assign({}, previous, validatorResult)
        : previous;
    }, {});
  }

  function applyFieldValidators(field: string, value: string) {
    const fieldValidators = getValidatorsForField(field);
    return computeValidators(fieldValidators, value);
  }

  function applyFormValidators() {
    if (!validators) {
      return {};
    }
    return computeValidators(validators, formData);
  }

  useEffect(() => {
    let formErrored = false;
    const allErrors = Object.keys(formSpecif).reduce((prev, key) => {
      const fieldErrors = applyFieldValidators(key, formData[key]);
      if (Object.keys(fieldErrors).length === 0) {
        prev[key] = null;
      } else {
        prev[key] = fieldErrors;
        formErrored = true;
      }
      return prev;
    }, {} as Record<string, any>);
    const formErrors = applyFormValidators();
    allErrors.$form = {};
    if (Object.keys(formErrors).length > 0) {
      formErrored = true;
      allErrors.$form.errors = formErrors;
    }
    allErrors.$form.valid = !formErrored;
    setErrors(allErrors);
  }, [formData, validators]); // Do not depend on formSpecif, applyFieldValidators, applyFormValidators !!

  const formAccess = Object.keys(formData).reduce((prev, fieldName) => {
    prev[fieldName] = {
      get: () => formData[fieldName],
      set: (v: any) =>
        setFormData((lastData) => ({
          ...lastData,
          [fieldName]: v,
        })),
    };
    return prev;
  }, {} as Record<string, { get: () => any; set: (v: any) => void }>);

  return [formAccess, errors];
}

export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !=='' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  return isValid
}

export const inputChangedHandler = (event, formValue) => {
  const updatedFormElement = updateObject(formValue[event.target.name], {
    value: event.target.value,
    valid: checkValidity(event.target.value, formValue[event.target.name].validation),
    touched: true,
  });

  const updatedFormValue = updateObject(formValue, {
    [event.target.name]: updatedFormElement
  })

  let formValid = true;
  for (let inputIdentifier in updatedFormValue) {
    formValid = updatedFormValue[inputIdentifier].valid && formValid;
  }

  return [updatedFormValue, formValid]
};
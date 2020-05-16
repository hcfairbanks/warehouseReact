export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const validateItem = (inputIds) => {
  document.getElementById('error_msg').innerHTML = "";

  let validInputs = true;
  inputIds.forEach( (inputId) => {
    const inputElement = document.getElementById(inputId);
    if (inputElement.value.length === 0){
      validInputs = false;
      const msg = capitalize(inputId) + " needs to be added.<br/>"
      inputElement.className = 'form-control is-invalid';
      document.getElementById('error_msg').innerHTML += msg
      document.getElementById('error_msg').className = "alert alert-danger";
    } else {
      inputElement.className = 'form-control';
    }
  })
  return validInputs
}


export const createSearch = (item_names,prefix) => {
  let return_string = "";
  item_names.forEach( element => {
    const element_value = document.getElementById(prefix + element).value;
    if (element_value !== undefined && element_value !== ''){
      return_string += `${element}=${element_value}&`
    }
  });
  return return_string;
};
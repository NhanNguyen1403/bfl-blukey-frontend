/*******************************************************
 * Using this service to creat props for Select components
 ********************************************************/
import moment from "moment"

const gSelect = function (
  name = '',
  value,
  style = '',
  data = [],
  isRequired = true,
  isDisable = false,
) {
    return {
      name,
      value,
      style,
      isRequired,
      isDisable,
      data
    }
}

export default gSelect

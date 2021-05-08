exports.inputConfig = [
  {
    type: 'text',
    size: 'lg',
    labelName: 'Email',
    isRequired: true,
    isValid: false,
    getValue: (value) => {
      console.log(value)
    },

  },
  {
    type: 'password',
    size: 'lg',
    labelName: 'Password',
    isRequired: true,
    isValid: false,
    getValue: (value) => {
      console.log(value)
    },

  },
]

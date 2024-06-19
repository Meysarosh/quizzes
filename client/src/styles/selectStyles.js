export const theme = {
  colors: {},
};

export const selectStyles = {
  control: (baseStyles) => ({
    ...baseStyles,
    border: 0,
    boxShadow: 'none',
    backgroundColor: theme.colors.cardBackgroundColor,
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    visibility: 'hidden',
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    color: state.isDisabled ? '#a7a7a7' : '#dab49d',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
    '&:hover': {
      color: '#dab49d',
    },
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    position: 'relative',
    top: '0',
    padding: '0.5rem 0.25rem 0.5rem 0.5rem',
    backgroundColor: theme.colors.linen,
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    maxHeight: '12.5rem',
    overflow: 'scroll',
    paddingRight: '0.25rem',

    '::-webkit-scrollbar': {
      width: '0.5rem',
      height: '0px',
    },
    '::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: '#dab49d',
      borderRadius: '0.5rem',
    },
  }),
  option: (baseStyles, state) => ({
    marginBottom: '0.5rem',
    padding: '0.6rem',
    cursor: state.isFocused && 'pointer',
    fontFamily: 'InterReg, sans-serif',
    fontSize: '1.25rem',
    color: state.isDisabled ? '#a7a7a7' : theme.colors.caputMortuum,
    backgroundColor:
      state.isSelected || state.isFocused
        ? theme.colors.desertSand
        : theme.colors.cardBackgroundColor,
    borderRadius: '0.3rem',
  }),
  placeholder: (baseStyles, state) => ({
    ...baseStyles,
    fontFamily: 'InterReg, sans-serif',
    fontSize: '1.25rem',
    color: state.isDisabled ? '#a7a7a7' : theme.colors.caputMortuum,
  }),
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    fontFamily: 'InterReg, sans-serif',
    fontSize: '1.25rem',
    color: state.isDisabled ? '#a7a7a7' : theme.colors.caputMortuum,
  }),
};

export const selectStyles = {
  control: (baseStyles) => ({
    ...baseStyles,
    border: 0,
    boxShadow: 'none',
    backgroundColor: '#d9d9d9',
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    visibility: 'hidden',
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    position: 'relative',
    top: '0',
    padding: '0.5rem 0.5rem 0 0.5rem',
    backgroundColor: '#F3E9DC',
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    overflow: 'hidden',
  }),
  option: (baseStyles, state) => ({
    marginBottom: '0.5rem',
    padding: '0.6rem',
    cursor: state.isFocused && 'pointer',
    fontFamily: 'InterReg, sans-serif',
    fontSize: '1.25rem',
    color: '#5E3023',
    backgroundColor: state.isSelected || state.isFocused ? '#DAB49D' : '#d9d9d9',
    borderRadius: '0.3rem',
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    fontFamily: 'InterReg, sans-serif',
    fontSize: '1.25rem',
    color: '#5E3023',
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    fontFamily: 'InterReg, sans-serif',
    fontSize: '1.25rem',
    color: '#5E3023',
  }),
};

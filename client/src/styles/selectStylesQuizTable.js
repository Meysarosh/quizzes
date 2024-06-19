import { theme } from './selectStyles';

export const selectStylesQuizTable = {
  container: (baseStyles) => ({
    ...baseStyles,
    width: '90%',
    heigth: '100%',
  }),
  control: (baseStyles) => ({
    ...baseStyles,
    width: '10rem',
    backgroundColor: 'transparent',
    overflow: 'visible',
    borderColor: theme.colors.caramel,
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: theme.colors.mainBackground,
    border: `1px solid ${theme.colors.caramel}`,
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    padding: '0',
  }),
  option: (baseStyles, state) => ({
    padding: '1rem',
    cursor: state.isFocused && 'pointer',
    fontFamily: 'InterReg, sans-serif',
    fontSize: '1rem',
    color: state.isDisabled ? theme.colors.inputFieldColor : theme.colors.text,
    backgroundColor: state.isFocused && theme.colors.linen,

    '&:hover': {
      cursor: state.isDisabled && `url('src/assets/img/Not_allowed.png'), auto;`,
    },
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    fontFamily: 'InterReg, sans-serif',
    fontSize: '1rem',
    color: theme.colors.text,
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    fontFamily: 'InterReg, sans-serif',
    fontSize: '1rem',
    color: theme.colors.text,
  }),
};

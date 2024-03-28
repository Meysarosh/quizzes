import * as yup from 'yup';

export const schema = yup
  .object({
    fullname: yup
      .string()
      .required('* Name is required')
      .min(7, '* Name must be at least 7 characters long')
      .max(30, '* Name must not exceed 30 characters'),
    email: yup.string().required('* Email is required').email('* Invalid email format'),
    username: yup
      .string()
      .required('* Username is required')
      .min(4, '* Username must be at least 4 characters long')
      .max(20, '* Username must not exceed 20 character'),
    password: yup
      .string()
      .required('* Password is required')
      .min(10, '* Password must be at least 10 character long')
      .matches(/[a-z]/, '* Password must contain at least one lowercase letter')
      .matches(/[0-9]/, '* Password must contain at least one number')
      .matches(/[A-Z]/, '* Password must contain at least one uppercase letter')
      .matches(
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
        '* Password must contain at least one special character'
      ),
    passwordconfirm: yup.string().oneOf([yup.ref('password'), null], '* Passwords must match'),
  })
  .required();

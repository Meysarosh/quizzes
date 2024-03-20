import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// function checkUsername(username){

// }

const schema = yup
  .object({
    fullName: yup
      .string()
      .required('Name is required')
      .min(7, 'Name must be at least 7 characters long')
      .max(30, 'Name must not exceed 30 characters'),
    email: yup.string().required('email is required').email('Invalid email format'),
    username: yup
      .string()
      .required('Username is required')
      .min(4, 'Username must be at least 4 characters long')
      .max(20, 'Username must not exceed 20 character'),
    //   .test(
    //     "Unique username",
    //     "This username is not available",
    //     function (username) {
    //       return checkUsername(username);
    //     }
    //   )
    password: yup
      .string()
      .required('Password is required')
      .min(10, 'Password must be at least 10 character long')
      .max(20, 'Password must not exceed 20 characters'),
    confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  })
  .required();

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    // console.log(data);
    alert(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="fullName">full name</label>
      <input id="fullName" {...register('fullName')} />
      <p>{errors.fullName?.message}</p>

      <label htmlFor="email">email</label>
      <input id="email" {...register('email')} />
      <p>{errors.email?.message}</p>

      <label htmlFor="username">username</label>
      <input id="username" {...register('username')} />
      <p>{errors.username?.message}</p>

      <label htmlFor="password">password</label>
      <input id="password" {...register('password')} />
      <p>{errors.password?.message}</p>

      <label htmlFor="confirm">confirm password</label>
      <input id="confirm" {...register('confirm')} />
      <p>{errors.confirm?.message}</p>

      <button type="submit">Submit</button>
    </form>
  );
}

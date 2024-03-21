import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, ConfirmButton } from '../styles';
import { InputBlock } from './InputBlock';

const schema = yup
  .object({
    fullname: yup
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
    password: yup
      .string()
      .required('Password is required')
      .min(10, 'Password must be at least 10 character long')
      .max(20, 'Password must not exceed 20 characters'),
    passwordconfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  })
  .required();

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    alert(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputBlock register={register} error={errors.fullname?.message}>
        full name
      </InputBlock>
      <InputBlock register={register} error={errors.email?.message}>
        email
      </InputBlock>
      <InputBlock register={register} error={errors.username?.message}>
        username
      </InputBlock>
      <InputBlock register={register} error={errors.password?.message}>
        password
      </InputBlock>
      <InputBlock register={register} error={errors.passwordconfirm?.message}>
        password confirm
      </InputBlock>
      <ConfirmButton type="submit">Register</ConfirmButton>
    </Form>
  );
}

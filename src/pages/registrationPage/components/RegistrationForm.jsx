import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Form, Button } from './RegistrationForm.styles';
import { InputBlock } from '../../../components/inputBlock';
import { createNewUser } from '../../../store/actions/createNewUser';
import { notify } from '../../../components/toast/notify';

const schema = yup
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

export function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    dispatch(createNewUser(data)).then((res) => {
      if (res.type === 'createNewUser/rejected') notify('error', res.payload);
      notify(
        'success',
        `Congratulation! New user ${res.payload.user.username} was successfully created!`
      );
      navigate('/home');
    });
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
      <Button type="submit">Register</Button>
    </Form>
  );
}

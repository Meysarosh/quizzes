import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from './RegistrationForm.styles';
import { FormField } from '../../../components/formField';
import { createNewUser } from '../../../store/actions';
import { schema } from '../../../utils/const/yupSchema';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    token && navigate('/home');
  }, [token, navigate]);

  function onSubmit(data) {
    dispatch(createNewUser(data));
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField register={register} error={errors.fullname?.message}>
        full name
      </FormField>
      <FormField register={register} error={errors.email?.message}>
        email
      </FormField>
      <FormField register={register} error={errors.username?.message}>
        username
      </FormField>
      <FormField register={register} error={errors.password?.message}>
        password
      </FormField>
      <FormField register={register} error={errors.passwordconfirm?.message}>
        password confirm
      </FormField>
      <Button type="submit">Register</Button>
    </Form>
  );
}

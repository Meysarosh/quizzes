import { schema } from '../../../utils/const/yupSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormField } from '../../../components/formField';
import { notify } from '../../../utils/helperFunctions/notify';
import { MdAdd } from 'react-icons/md';
import { Form, Button, Avatar, PlusButton, UserName } from './ProfileForm.styles';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';

export function ProfileForm() {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const addFileRef = useRef();
  const [file, setFile] = useState(null);
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  function addUserImage() {
    addFileRef && addFileRef.current.click();
  }

  function onSubmit(data) {
    notify('success', JSON.stringify(data));
  }

  return (
    <>
      <Avatar $img={file ? file : 'src/assets/img/default.png'}>
        <PlusButton onClick={addUserImage}>
          <MdAdd />
        </PlusButton>
      </Avatar>
      <input type="file" onChange={handleChange} style={{ display: 'none' }} ref={addFileRef} />
      <UserName>{user.fullname}</UserName>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormField
          defaultValue={user.fullname}
          register={register}
          error={errors.fullname?.message}
        >
          full name
        </FormField>
        <FormField defaultValue={user.email} register={register} error={errors.email?.message}>
          email
        </FormField>
        <FormField
          defaultValue={user.username}
          register={register}
          error={errors.username?.message}
        >
          username
        </FormField>
        <FormField register={register} error={errors.password?.message}>
          password
        </FormField>
        <FormField register={register} error={errors.passwordconfirm?.message}>
          password confirm
        </FormField>
        <FormField register={register} error={errors.passwordconfirm?.message}>
          date of birth
        </FormField>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

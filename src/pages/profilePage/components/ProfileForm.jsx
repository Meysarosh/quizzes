import { schema } from '../../../utils/const/yupSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormField } from '../../../components/formField';
import { notify } from '../../../utils/helperFunctions/notify';
import { MdAdd } from 'react-icons/md';
import { Form, Button, Avatar, PlusButton, UserName } from './ProfileForm.styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { updateUserData } from '../../../store/actions';

export function ProfileForm() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const addFileRef = useRef();
  const [file, setFile] = useState(null);

  useEffect(() => {
    user.img && setFile(user.img);
  }, [user]);

  function handleChange(e) {
    setFile(e.target.files[0].name);
  }

  function addUserImage() {
    addFileRef && addFileRef.current.click();
  }

  function onSubmit(data) {
    const dataToUpdate = { ...data, img: file, token, id: user.id };
    dispatch(updateUserData(dataToUpdate)).then((res) => {
      res.type === 'updateUserData/rejected'
        ? notify('error', res.payload)
        : notify('success', 'Your data updated successfully');
    });
  }

  return (
    <>
      <Avatar $img={file ? `src/assets/img/${file}` : 'src/assets/img/default.png'}>
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
        <FormField
          register={register}
          defaultValue={user.dateofbirth ? user.dateofbirth : null}
          error={errors.passwordconfirm?.message}
        >
          date of birth
        </FormField>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

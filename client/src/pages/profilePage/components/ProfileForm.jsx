import { schema } from '../../../utils/const/yupSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormField } from '../../../components/formField';
import { MdAdd } from 'react-icons/md';
import {
  Form,
  Button,
  Avatar,
  ImgContainer,
  Img,
  PlusButton,
  UserName,
} from './ProfileForm.styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { updateUserData } from '../../../store/actions';
import { uploadFile } from '../../../utils/uploadFile';
import { setUserError } from '../../../store/slices/userSlice';

export function ProfileForm() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const addFileRef = useRef();
  const [file, setFile] = useState({ preview: '', data: '' });

  useEffect(() => {
    user.img && setFile(user.img);
  }, [user]);

  function handleChange(e) {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(img);
  }

  function addUserImage() {
    addFileRef && addFileRef.current.click();
  }

  async function onSubmit({ fullname, username, email, password, dateofbirth }) {
    let isFileUploaded = false;
    if (file.data) {
      let formData = new FormData();
      formData.append('file', file.data);

      const response = await uploadFile(formData, `user-img${user.id}.png`);
      response.ok ? (isFileUploaded = true) : dispatch(setUserError(response));
    }

    dispatch(
      updateUserData({
        fullname,
        username,
        email,
        password,
        dateofbirth,
        img: file.data && isFileUploaded ? `user-img${user.id}.png` : user.img ? user.img : null,
      })
    );

    setFile({ preview: '', data: '' });
  }

  return (
    <>
      <Avatar>
        <ImgContainer>
          <Img
            src={
              file.preview
                ? `${file.preview}`
                : user.img
                  ? user.img.includes('http')
                    ? user.img
                    : `/src/assets/img/${user.img}`
                  : '/src/assets/img/default.png'
            }
            alt="profile photo"
          ></Img>
        </ImgContainer>
        <PlusButton onClick={addUserImage} data-testid="PlusButton">
          <MdAdd />
        </PlusButton>
      </Avatar>
      <input
        type="file"
        onChange={handleChange}
        style={{ display: 'none' }}
        ref={addFileRef}
        data-testid="fileUpload"
      />
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
        <FormField register={register} defaultValue={user.dateofbirth ? user.dateofbirth : null}>
          date of birth
        </FormField>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

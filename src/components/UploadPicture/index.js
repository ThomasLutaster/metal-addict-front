import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import { LIGHT_PRIMARY_COLOR } from 'src/styles/vars';

import './uploadPicture.scss';

function UploadPicture({ loading, manageSubmit }) {
  const { register, handleSubmit, reset } = useForm();
  const history = useHistory();
  const inputFileRef = useRef(null);

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append('image', data.picture[0]);
    manageSubmit(formData, history);
    reset();
  };

  return (
    <form className="uploadPicture">
      <input
        ref={(evt) => {
          register(evt, {
            required: true,
          });
          inputFileRef.current = evt;
        }}
        type="file"
        name="picture"
        accept="image/png, image/jpeg, image/gif"
        onChange={handleSubmit(onSubmit)}
        style={{ display: 'none' }}
      />
      {
        loading && (
          <Loader
            type="ThreeDots"
            color={LIGHT_PRIMARY_COLOR}
            width={30}
            height={30}
          />
        )
      }
      {
        !loading && (
          <AddAPhotoIcon
            className="uploadPicture-icon"
            onClick={(evt) => {
              evt.preventDefault();
              inputFileRef.current.click();
            }}
          />
        )
      }
    </form>
  );
}

UploadPicture.propTypes = {
  loading: PropTypes.bool.isRequired,
  manageSubmit: PropTypes.func.isRequired,
};

export default UploadPicture;

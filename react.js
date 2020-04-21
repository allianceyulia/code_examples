import React, { memo } from 'react';
import { useEffectOnce } from 'react-use';
import {
  Input, Button, FormControlLabel, Checkbox,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { resetFields, updateField, updateUser } from '../../stores/actionCreators';

function Settings() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.currentUser);
  const userInfoChanged = useSelector(state => state.settings);

  useEffectOnce(() => () => {
    dispatch(resetFields(userInfo));
  });

  const handleChange = ({ target: { name, value } }, checkboxValue) => {
    dispatch(updateField({ name, value: checkboxValue === undefined ? value : checkboxValue }));
  };

  const handleSubmit = () => {
    dispatch(updateUser(userInfoChanged));
  };

  const {
    email, username, password, notifications,
  } = userInfoChanged;
  return (
    <>
      <h1>Settings</h1>
      <div className="form-container">
        <Input placeholder="Email" value={email} onChange={handleChange} name="email"/>
        <Input placeholder="Username" value={username} onChange={handleChange} name="username"/>
        <Input placeholder="Password" value={password} onChange={handleChange} name="password" type="password"/>
        <FormControlLabel
          control={(
            <Checkbox
              checked={!!notifications}
              onChange={e => handleChange(e, !notifications)}
              name="notifications"
            />
          )}
          label="Notifications"
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </>
);
}

export default memo(Settings);

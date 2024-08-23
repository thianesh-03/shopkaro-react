import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../authService'; // Ensure this path is correct
import { Button, TextField, Typography, Container } from '@mui/material';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signUp } = useAuth(); // Destructure the signUp function from useAuth
  const [error, setError] = React.useState('');

  const onSubmit = async (data) => {
    try {
      await signUp(data.email, data.password);
      // Handle successful signup, e.g., redirect to login page
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Sign Up</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            label="Email"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Confirm Password"
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: value => value === watch('password') || 'Passwords do not match'
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
            margin="normal"
          />
        </div>
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary">Sign Up</Button>
      </form>
    </Container>
  );
};

export default Signup;

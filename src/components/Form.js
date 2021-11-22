import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, TextField, Box, Fade, CircularProgress } from '@mui/material';

const Form = styled('form')`
  position: relative;
  padding: 4px;
`;

const Loading = styled('div')`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255 255 255 / 68%);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormComponent = ({
    fields,
    onSubmit,
    errors,
    register,
    buttonText,
    isLoading,
    canSubmit,
    buttonColor = 'primary',
}) => (
    <Form onSubmit={onSubmit}>
        <Fade in={isLoading}>
            <Loading>
                <CircularProgress size={60} />
            </Loading>
        </Fade>
        {fields.map((props, index) => {
            const { name } = props;
            const error = errors?.[name]?.message;
            const hasError = Boolean(error);
            return (
                <TextField
                    key={`${name}-${index}`}
                    error={hasError}
                    helperText={error}
                    size='small'
                    fullWidth
                    margin='normal'
                    {...props}
                    {...register(name)}
                />
            )
        })}
        <Box mt={3}>
            <Button
                type='submit'
                variant='contained'
                fullWidth
                color={buttonColor}
                disabled={!canSubmit}
            >
                {buttonText}
            </Button>
        </Box>
    </Form>
)

export default FormComponent;

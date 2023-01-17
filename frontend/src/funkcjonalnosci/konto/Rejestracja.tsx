import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';

export default function Rejestracja() {
    const history = useHistory();
    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    });

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Haslo')) {
                    setError('haslo', { message: error })
                } else if (error.includes('Email')) {
                    setError('email', { message: error })
                } else if (error.includes('Login')) {
                    setError('login', { message: error })
                }
            });
        }
    }

    return (
        <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Rejestracja
            </Typography>
            <Box component="form"
                onSubmit={handleSubmit((data) =>
                    agent.Konto.rejestracja(data)
                        .then(() => {
                            toast.success('Rejestracja powiodła się, teraz możesz się zalogować');
                            history.push('/logowanie');
                        })
                        .catch(error => handleApiErrors(error))
                )}
                noValidate sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    fullWidth
                    label="Login"
                    autoFocus
                    {...register('login', { required: 'Login jest wymagany' })}
                    error={!!errors.login}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Adres email"
                    {...register('email', { 
                        required: 'Email jest wymagany',
                        pattern: {
                            value: /^\w+[\w-.]*@\w+((-\w+)|(\w*)).[a-z]{2,3}$/,
                            message: 'Not a valid email address'
                        } 
                    })}
                    error={!!errors.email}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Hasło"
                    type="password"
                    {...register('password', { 
                        required: 'Haslo jest wymagane',
                        
                    })}
                    error={!!errors.haslo}
                />
                <LoadingButton
                    disabled={!isValid}
                    loading={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Zarejestruj się
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/logowanie'>
                            {"Masz już konto? Zaloguj się!"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../sklep/configureStore';
import { zalogujUzytkownik } from './kontoSlice';

export default function Login() {
    const history = useHistory();
    const location = useLocation<any>();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    });

    async function submitForm(data: FieldValues) {
        try {
            await dispatch(zalogujUzytkownik(data));
            history.push(location.state?.from?.pathname ||  '/katalog');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Zaloguj się
            </Typography>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
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
                    label="Hasło"
                    type="password"
                    {...register('password', { required: 'Hasło jest wymagane' })}
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
                    Zaloguj się
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/rejestracja'>
                            {"Nie masz konta? Zarejestruj się!"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
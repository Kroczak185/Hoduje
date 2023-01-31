import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { store } from "../../funkcjonalnosci/redux/configureStore";
import{ history } from "../../index"
import { PodzialOdpowiedz } from "../modele/podzial";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/BackEnd/';
axios.defaults.withCredentials = true;

const odpowiedzBody = (odpowiedz: AxiosResponse) => odpowiedz.data;

axios.interceptors.request.use(config => {
    const token = store.getState().konto.uzytkownik?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async odpowiedz => {
    await sleep();
    const pagination = odpowiedz.headers['pagination'];
    if (pagination) {
        odpowiedz.data = new PodzialOdpowiedz(odpowiedz.data, JSON.parse(pagination));
        return odpowiedz;
    }
    return odpowiedz;
}, (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            history.push({
                pathname: '/server-error',
                state: {error: data}
            });
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(odpowiedzBody),
    post: (url: string, body: {}) => axios.post(url, body).then(odpowiedzBody),
    put: (url: string, body: {}) => axios.put(url, body).then(odpowiedzBody),
    delete: (url: string) => axios.delete(url).then(odpowiedzBody)
}

const Admin = {
    postZwierze: (zwierze: any) => requests.post('zwierzeta', zwierze),
    putZwierze: (zwierze: any) => requests.put('zwierzeta', zwierze),
    deleteZwierze: (id: number) => requests.delete(`zwierzeta/${id}`)
}

const Katalog = {
    list: (params: URLSearchParams) => requests.get('zwierzeta', params),
    details: (id: number) => requests.get(`zwierzeta/${id}`),
    fetchFilters: () => requests.get('zwierzeta/filters')
}

const TestErrors = {
    get400Error: () => requests.get('Error/złe-zapytanie'),
    get401Error: () => requests.get('Error/nieautoryzowane'),
    get404Error: () => requests.get('Error/nie-znaleziono'),
    get500Error: () => requests.get('Error/błąd-serwera'),
    getValidationError: () => requests.get('Error/błąd-walidacji'),
}

const Koszyk = {
    get: () => requests.get('koszyk'),
    dodajItem: (ZwierzeId: number) => requests.post(`koszyk?ZwierzeId=${ZwierzeId}`,{}),
    usunItem: (ZwierzeId: number) => requests.delete(`koszyk?ZwierzeId=${ZwierzeId}`)
}

const Konto = {
    login: (wartosci: any) => requests.post('konto/login', wartosci),
    rejestracja: (wartosci: any) => requests.post('konto/rejestracja', wartosci),
    aktualnyUzytkownik: () => requests.get('konto/aktualnyUzytkownik'),
}


const agent = {
    Katalog,
    TestErrors,
    Koszyk,
    Konto,
    Admin
}

export default agent;
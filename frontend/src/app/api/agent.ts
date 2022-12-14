import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import{ history } from "../../index"

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/BackEnd/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    await sleep();
    return response;
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
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('zwierzeta'),
    details: (id: number) => requests.get(`zwierzeta/${id}`)
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

const agent = {
    Catalog,
    TestErrors,
    Koszyk
}

export default agent;
import { URL, Method, Route, ServerErrorMessage } from './constants.js';

// Функция, которая отвечает за выполнение запросов на сервер
const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${URL}${route}`, { method, body })
    // Обрабатываем полученный ответ
    .then((response) => {
      // Если ответ не успешен (код не в диапазоне 200-299)
      if (!response.ok) {
        // Бросаем ошибку
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    // Обрабатываем ошибки при выполнении запроса
    .catch(() => {
      // Бросаем ошибку с текстом ошибки
      throw new Error(errorText);
    });

// Функция для получения данных с сервера
const getData = () => load(Route.GET_DATA, ServerErrorMessage.GET_DATA);

// Функция для отправки данных на сервер
const sendData = (body) => load(Route.SEND_DATA, ServerErrorMessage.POST_DATA, Method.POST, body);

export { getData, sendData };

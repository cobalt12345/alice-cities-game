

const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.post('/game', function (req, res) {

    console.info('Handle. Request:', req);
    let responseBody = {
        version: req.body.version,
        session: req.body.session,
        response: {
            text: null,
            tts: null,
            buttons: [
                {
                    title: "Помощь",
                    payload: {

                    },
                    url: undefined,
                    hide: false
                },
                {
                    title: 'Выход',
                    payload: {

                    },
                    url: undefined,
                    hide: false
                }
            ],
            end_session: false
        }
    };

    let request = req.body.request;
    if (request.type === 'SimpleUtterance' && !request.command) {
        console.debug('Simple start...');
        responseBody.response.text = "Готовы повеселиться? Тогда начинаем. Мой ход - Москва."
        responseBody.response.tts = "Готовы повеселиться? Тогда начинаем. Мой ход - Москва.";
    } else if ((request.type === 'SimpleUtterance' || request.type === 'ButtonPressed')
        && request?.nlu?.intents?.help) {

        responseBody.response.text = "Вы должны назвать город, начинающийся с последней буквы города, который я называю.";
        responseBody.response.tts = "Вы должны назвать город, начинающийся с последней буквы города, который я называю.";

    } else if((request.type === 'SimpleUtterance' || request.type === 'ButtonPressed') && request?.nlu?.intents?.exit) {
        responseBody.response.end_session = true;
        responseBody.response.text = "Продолжим в другой раз."
        responseBody.response.tts = "Продолжим в другой раз."
        responseBody.response.buttons.length = 0;
    } else {
        responseBody.response.text = "Упсс... Что-то пошло не так.";
        responseBody.response.tts = "Упсс... Что-то пошло не так.";
    }

    res.json(responseBody);
});

app.use('*', function (req, res) {
    res.sendStatus(200);
});

app.listen(port);
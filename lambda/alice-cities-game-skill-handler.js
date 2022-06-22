exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    console.info('Handle. Request:', event);

    const body = JSON.parse(event.body);
    const {session, version, request} = body;
    let responseBody = {
        version,
        session,
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

    const response = {
        statusCode: 200,
        headers: {
            'x-custom-header': 'my custom header'
        },
        body: JSON.stringify(responseBody)
    }
    console.debug('Handle. Response: ', responseBody);

    return response;
}
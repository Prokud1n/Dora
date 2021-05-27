const errorDescription = {
    ACCOUNT_ALREADY_EXISTS: 'Данный e-mail уже зарегистрирован',
    FORM_NOT_VALID: 'неверное тело запроса.',
    WRONG_EMAIL_FORMAT: 'Некорректный e-mail, повторите попытку',
    ACCOUNT_NOT_EXISTS: ' Данный e-mail не зарегистрирован, повторите попытку',
    WRONG_PASSWORD: 'Неверный пароль, повторите попытку',
    WRONG_TOKEN: ' неверный токен для пользователя.',
    ACCOUNT_ALREADY_VERIFIED: ' аккаунт уже был верифицирован.',
    WRONG_CODE: 'Неверный код, повторите попытку',
    CODE_EXPIRES: ' истекло время жизни кода.',
    ACCOUNT_NOT_VERIFIED: 'аккаунт не верифицирован.',
    FREQ_PASSWORD_CHANGE: 'слишком частая попытка смены пароля.',
    OLD_PASSWORD: 'старый пароль не может быть установлен как новый.',
    UNABLE_TO_SAVE_FILE: 'невозможно сохранить файл.',
    NO_WARRANTIES: 'нет гарантийных чеков/талонов.',
    NO_FILE: 'отсутсвует запрашиваемый файл.',
    NO_WARRANTY: 'нет гарантийного чека/талона.',
    UNABLE_TO_DELETE_FILE: 'невозможно удалить файл.',
};

export const ERROR_LENGTH_PASSWORD = 'Пароль должен содержать не менее 8 символов';
export const HAS_NUMBER_PASSWORD = 'Пароль должен содержать хотя бы одну цифру';

export default errorDescription;
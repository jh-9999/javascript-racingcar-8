import { Random, Console } from '@woowacourse/mission-utils';

const NAME_PLACEHOLDER = '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n'
const ATTEMPT_COUNT_PLACEHOLDER = '시도할 횟수는 몇 회인가요?\n'
const PATTERN_NAME = /^[가-힣a-zA-Z0-9,]+$/
const ERROR_MESSAGE = '[ERROR]';
const ERROR_MESSAGE_EMPTY_NAME = '이름을 입력해주세요.';
const ERROR_MESSAGE_INVALID_DELIMITER = '이름은 쉼표(,) 기준으로 구분해주세요.';
const ERROR_MESSAGE_NAME_LENGTH = '이름은 5자 이하로 입력해주세요.';

class App {
  async run() {
    const userInputName = await getUserInput(NAME_PLACEHOLDER);
    const names = checkUserInputName(userInputName);
    const userInputAttemptCount = await getUserInput(ATTEMPT_COUNT_PLACEHOLDER);
  }
}

async function getUserInput(placeholder) {
  return await Console.readLineAsync(placeholder)
}

export function checkUserInputName(userInputName) {
  userInputName.replace(/\s+/g, '');
  if (!userInputName) errorMessage(ERROR_MESSAGE_EMPTY_NAME)
  if (!PATTERN_NAME.test(userInputName)) errorMessage(ERROR_MESSAGE_INVALID_DELIMITER)
  const names = userInputName.split(',');
  if (names.some((name) => name.length > 5)) errorMessage(ERROR_MESSAGE_NAME_LENGTH)
  return names;
}

function errorMessage(message) {
  throw new Error(`${ERROR_MESSAGE} ${message}`);
}

export default App;

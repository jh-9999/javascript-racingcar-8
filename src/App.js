import { Random, Console } from '@woowacourse/mission-utils';

const NAME_PLACEHOLDER = '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n'
const PATTERN_NAME = /^[가-힣a-zA-Z0-9,]+$/

class App {
  async run() {
    const userInputName = await getUserInput(NAME_PLACEHOLDER)
  }
}

async function getUserInput(placeholder) {
  return await Console.readLineAsync(placeholder)
}

export function checkUserInputName(userInputName) {
  userInputName.replace(/\s+/g, '');
  if (!userInputName) throw new Error('[ERROR] 이름을 입력해주세요.');
  if (!PATTERN_NAME.test(userInputName)) throw new Error('[ERROR] 이름은 쉼표(,) 기준으로 구분해주세요.');
  const names = userInputName.split(',');
  if (names.some((name) => name.length > 5)) throw new Error('[ERROR] 이름은 5자 이하로 입력해주세요.');
}

export default App;

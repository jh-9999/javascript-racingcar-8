import { Random, Console } from '@woowacourse/mission-utils';

const NAME_PLACEHOLDER = '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n'

class App {
  async run() {
    const userInputName = await getUserInput(NAME_PLACEHOLDER)
  }
}

async function getUserInput(placeholder) {
  return await Console.readLineAsync(placeholder)
}

export default App;

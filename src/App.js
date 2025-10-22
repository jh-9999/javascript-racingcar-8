import { Random, Console } from '@woowacourse/mission-utils';

const NAME_PLACEHOLDER = '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n'
const ATTEMPT_COUNT_PLACEHOLDER = '시도할 횟수는 몇 회인가요?\n'
const RESULT_MESSAGE = '\n실행 결과'
const WINNERS_MESSAGE = '최종 우승자 : ';
const PATTERN_NAME = /^[가-힣a-zA-Z0-9,]+$/
const PATTERN_ATTEMPT_COUNT = /^[0-9]+$/;
const ERROR_MESSAGE = '[ERROR]';
const ERROR_MESSAGE_EMPTY_NAME = '이름을 입력해주세요.';
const ERROR_MESSAGE_INVALID_DELIMITER = '이름은 쉼표(,) 기준으로 구분해주세요.';
const ERROR_MESSAGE_NAME_LENGTH = '이름은 5자 이하로 입력해주세요.';
const ERROR_MESSAGE_EMPTY_ATTEMPT_COUNT = '시도 횟수를 입력해주세요.';
const ERROR_MESSAGE_INVALID_ATTEMPT_COUNT = '시도 횟수는 숫자만 입력해주세요.';


class App {
  async run() {
    const userInputName = await getUserInput(NAME_PLACEHOLDER);
    const names = checkUserInputName(userInputName);

    const userInputAttemptCount = await getUserInput(ATTEMPT_COUNT_PLACEHOLDER);
    const attemptCount = checkUserInputAttemptCount(userInputAttemptCount);
    Console.print(RESULT_MESSAGE);

    const score = startRacingCar(names, attemptCount);
    const winners = winnersList(score, names);
    print(WINNERS_MESSAGE + winners);
  }
}

async function getUserInput(placeholder) {
  return await Console.readLineAsync(placeholder)
}

export function checkUserInputName(userInputName) {
  userInputName = removeSpaces(userInputName);
  if (!userInputName) errorMessage(ERROR_MESSAGE_EMPTY_NAME)
  if (!PATTERN_NAME.test(userInputName)) errorMessage(ERROR_MESSAGE_INVALID_DELIMITER)
  const names = userInputName.split(',');
  if (names.some((name) => name.length > 5)) errorMessage(ERROR_MESSAGE_NAME_LENGTH)
  return names;
}

function errorMessage(message) {
  throw new Error(`${ERROR_MESSAGE} ${message}`);
}

export function checkUserInputAttemptCount(userInputAttemptCount) {
  userInputAttemptCount = removeSpaces(userInputAttemptCount);
  if (!userInputAttemptCount) errorMessage(ERROR_MESSAGE_EMPTY_ATTEMPT_COUNT)
  if (!PATTERN_ATTEMPT_COUNT.test(userInputAttemptCount)) errorMessage(ERROR_MESSAGE_INVALID_ATTEMPT_COUNT)
  return parseInt(userInputAttemptCount);
}

function removeSpaces(string) {
  return string.replace(/\s+/g, '');
}

function getRandomNumber() {
  return Random.pickNumberInRange(0, 9);
}

export function moveOrStop(attemptCount) {
  if (attemptCount >= 4) return 'move';
  if (attemptCount < 4) return 'stop';
}

function startRacingCar(names, attemptCount) {
  let score = new Array(names.length).fill(0);

  for(let i = 0; i < attemptCount; i++) {
    updateScore(score);
    printProgress(names, score);
    print('');
  }
  return score;
}

function updateScore(score) {
  for (let i = 0; i < score.length; i++) {
    const randomNumber = getRandomNumber();
    const action = moveOrStop(randomNumber);
    if (action === 'move') {
      score[i] = score[i] + 1;
    }
  }
}

function printProgress(names, score) {
  for (let i = 0; i < names.length; i++){
    print(`${names[i]} : ${'-'.repeat(score[i])}`);
  }
}

function print(string) {
  return Console.print(string);
}

function winnersList(score, names) {
  const maxScore = Math.max(...score);
  let winners = '';
  let startIndex = 0;
  while(true) {
    let index = score.indexOf(maxScore, startIndex);
    if(index === -1) break;
    if(winners) winners += ', ';
    winners += names[index];
    startIndex = index + 1;
  }
  return winners;
}

export default App;

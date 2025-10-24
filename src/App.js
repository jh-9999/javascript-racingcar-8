import { Random, Console } from '@woowacourse/mission-utils';

const MESSAGES = {
  NAME_PLACEHOLDER:'경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
  ATTEMPT_PLACEHOLDER: '시도할 횟수는 몇 회인가요?\n',
  RESULT_HEADER: '\n실행 결과',
  WINNERS_PREFIX: '최종 우승자 : ',
  ERROR_PREFIX: '[ERROR]',
  ERROR_EMPTY_NAME: '이름을 입력해주세요.',
  ERROR_INVALID_DELIMITER: '이름은 쉼표(,) 기준으로 구분해주세요.',
  ERROR_NAME_LENGTH: '이름은 5자 이하로 입력해주세요.',
  ERROR_EMPTY_ATTEMPT_COUNT: '시도 횟수를 입력해주세요.',
  ERROR_INVALID_ATTEMPT_COUNT: '시도 횟수는 숫자만 입력해주세요.',
}

const RULES = {
  PATTERN_ATTEMPT_COUNT: /^[1-9]+$/,
  PATTERN_NAME: /^[가-힣a-zA-Z0-9,]+$/,
  NAME_MAX_LENGTH: 5,
  MOVE_THRESHOLD: 4,
  RANDOM_MIN: 0,
  RANDOM_MAX: 9,
}



class App {
  async run() {
    const userInputName = await getUserInput(MESSAGES.NAME_PLACEHOLDER);
    const names = checkUserInputName(userInputName);

    const userInputAttemptCount = await getUserInput(MESSAGES.ATTEMPT_PLACEHOLDER);
    const attemptCount = checkUserInputAttemptCount(userInputAttemptCount);
    print(MESSAGES.RESULT_HEADER);

    const score = startRacingCar(names, attemptCount);
    const winners = winnersList(score, names);
    print(MESSAGES.WINNERS_PREFIX + winners);
  }
}

async function getUserInput(placeholder) {
  return await Console.readLineAsync(placeholder)
}

export function checkUserInputName(userInputName) {
  userInputName = removeSpaces(userInputName);
  if (!userInputName) errorMessage(MESSAGES.ERROR_EMPTY_NAME)
  if (!RULES.PATTERN_NAME.test(userInputName)) errorMessage(MESSAGES.ERROR_INVALID_DELIMITER)
  const names = userInputName.split(',').filter(name => name !== '');
  if (names.some((name) => name.length > RULES.NAME_MAX_LENGTH)) errorMessage(MESSAGES.ERROR_NAME_LENGTH)
  return names;
}

function errorMessage(message) {
  throw new Error(`${MESSAGES.ERROR_PREFIX} ${message}`);
}

export function checkUserInputAttemptCount(userInputAttemptCount) {
  userInputAttemptCount = removeSpaces(userInputAttemptCount);
  if (!userInputAttemptCount) errorMessage(MESSAGES.ERROR_EMPTY_ATTEMPT_COUNT)
  if (!RULES.PATTERN_ATTEMPT_COUNT.test(userInputAttemptCount)) errorMessage(MESSAGES.ERROR_INVALID_ATTEMPT_COUNT)
  return parseInt(userInputAttemptCount);
}

function removeSpaces(string) {
  return string.replace(/\s+/g, '');
}

function getRandomNumber() {
  return Random.pickNumberInRange(RULES.RANDOM_MIN, RULES.RANDOM_MAX);
}

export function moveOrStop(attemptCount) {
  if (attemptCount >= RULES.MOVE_THRESHOLD) return 'move';
  if (attemptCount < RULES.MOVE_THRESHOLD) return 'stop';
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

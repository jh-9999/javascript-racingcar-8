import { checkUserInputName } from './App.js';

describe('userInputName 유효성 검사', () => {
    beforeAll(() => console.log('테스트 시작'));
    afterAll(() => console.log('테스트 종료'));

    test('사용자가 이름 입력시, 빈 문자열일 경우 에러를 발생시킨다.', () =>{
        expect(() => checkUserInputName("")).toThrow('[ERROR]');
    });

    test('사용자가 이름 입력시, 구분자 (,) 외에 다른 특수문자가 포함되어 있을 경우 에러를 발생시킨다.', () => {
        expect(() => checkUserInputName('pobi.woni')).toThrow('[ERROR]');
    });

    test('사용자가 이름 입력시, 이름이 6글자 이상일 경우 에러를 발생시킨다.', () => {
        expect(() => checkUserInputName('pongki')).toThrow('[ERROR]');
    });

    
});
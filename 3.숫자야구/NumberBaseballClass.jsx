import React, { Component, createRef } from 'react';
import Try from './TryClass';

const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const arr = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    arr.push(chosen);
  }
  return arr;
};

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(), // ex:[1,3,5,7]
    tries: [], // push 쓰면 안 돼요
  };

  onSubmitForm = (e) => {
    const { result, value, tries, answer } = this.state;
    e.preventDefault();
    if (value === answer.join('')) {
      this.setState((prevState) => {
        return {
          result: '홈런!',
          tries: [...prevState.tries, { try: value, result: '홈런!' }],
        };
      });
      alert('게임을 다시 시작 합니다!');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
      this.inputRef.current.focus();
    } else {
      // 답이틀렸으면
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        // 10번이상 틀렸을때
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
        });
        alert('게임을 다시 시작 합니다!');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
          this.setState((prevState) => {
            return {
              tries: [
                ...prevState.tries,
                {
                  try: value,
                  result: `${strike} 스트라이크 , ${ball} 볼입니다`,
                },
              ],
              value: '',
            };
          });
        }
      }
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = createRef();

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.inputRef}
            maxLength={4}
            minLength={4}
            value={value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>시도: {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도:`} tryInfo={v} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball; // import NumberBaseball;

import React, { useRef, useState } from 'react';
import Try from './Try';

const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const arr = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    arr.push(chosen);
  }
  return arr;
};

const NumberBaseball = () => {
  const [answer, setAnswer] = useState(getNumbers); // getNumbers() 이렇게하면 랜더링이 될때마다 실행되기때문에 getNumbers
													// 라고적어주지만 저렇게 적어도 에러가나지는 않는다 
													// 리액트가 첫번째렌더링할때만 값을 할당하고 두번째부터는 랜더링이일어나도 무시한다
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [tries, setTries] = useState([]);
  const inputRef = useRef(null);


  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('홈런!');
      //   setTries((t) => {
      //   	return  ([...t, { try: value, result: '홈런!' }]);
      //   });
      setTries((t) => [
        ...t,
        {
          try: value,
          result: '홈런!',
        },
      ]);
      alert('게임을 다시 시작 합니다!');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
      inputRef.current.focus();
    } else {
      // 답이틀렸으면
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
        alert('게임을 다시 시작 합니다!');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputRef.current.focus();
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
        }
		setTries((t) => [
            ...t,
            {
              try: value,
              result: `${strike} 스트라이크, ${ball} 볼입니다.`,
            },
          ]);
          //   setTries((t) => {
          //     return ([
          //       ...t,
          //       {
          //         try: value,
          //         result: `${strike} 스트라이크 , ${ball} 볼입니다`,
          //       },
          //     ]);
          //   });
      }
    }
  };

  const onChangeInput = (e) => {
    console.log(answer);
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref = {inputRef}
          maxLength={4}
          minLength={4}
          value={value}
          onChange={onChangeInput}
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
};

export default NumberBaseball; // import NumberBaseball;

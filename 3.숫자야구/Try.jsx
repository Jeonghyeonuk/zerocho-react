import React, {memo} from 'react';

// const Try = (props) => {

// 컴포넌트는 기본적으로 props,state가 바뀌면 리랜더링되고 자식 컴포넌트는 부모가 리랜더링되면 리랜더링된다
//여기서 memo의역할은 pureComponent와 같음 (state나 props가 바뀔때만 렌더링해주는역할(부모의역할을안받음))
const Try = memo(({ tryInfo }) => {
  return (
    <>
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    </>
  );
})
Try.displayName= 'Try'; // memo를 쓰면 개발자도구에서 보이는 컴포넌트 이름이 바뀌어보여서 다시 원래대로 돌려줌
export default Try;

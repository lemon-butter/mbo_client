import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

// 할 일 조회, 목표 번호를 조건에 사용해서 해당 목표에 맞는 할 일만 불러와줌
const PART_LIST = gql`
  query PartList($partListId: Int!) {
    partList(id: $partListId) {
      toDoListCode
      objectiveCode
      toDoThing
    }
  }
`;

// 할 일 수정
const UPDATE_TO_TO_LIST = gql`
  mutation Mutation($updateToDoListInput: UpdateToDoListInput!) {
    updateToDoList(updateToDoListInput: $updateToDoListInput)
  }
`;

// 할 일 삭제
const DELETE_TO_DO_LIST = gql`
  mutation RemoveToDoList($removeToDoListId: Int!) {
    removeToDoList(id: $removeToDoListId)
  }
`;

function ToDoListChild(props: any) {
  // 목표 번호를 props 로 받아옴
  // console.log("props", props);

  const toDoList = props.value; // props로 상위 컴포넌트에서 넘겨준 값을 받는다.
  const [newThing, setNewThing] = useState(toDoList.toDoThing); // 할 일 수정용 state
  const [edited, setEdited] = useState(false); // 수정 모드 변환 플래그 값

  // 할 일 수정 mutation
  const [newToDoThing] = useMutation(UPDATE_TO_TO_LIST, {
    // 할 일 수정 후 전체 할 일 조회를 다시 호출
    refetchQueries: [
      {
        // 할 일 조회 호출 시 해당 목표 번호를 같이 던져줘야 함
        query: PART_LIST,
        variables: {
          partListId: toDoList.objectiveCode,
        },
      },
    ],
  });

  // 할 일 삭제 mutation
  const [toDoListCode] = useMutation(DELETE_TO_DO_LIST, {
    // 할 일 삭제 후 전체 할 일 조회를 다시 호출
    refetchQueries: [
      {
        // 할 일 조회 호출 시 해당 목표 번호를 같이 던져줘야 함
        query: PART_LIST,
        variables: {
          partListId: toDoList.objectiveCode,
        },
      },
    ],
  });

  // 수정 클릭시 text => input로 변경되도록 flag값을 변경해주는 함수
  function changeEdit() {
    setEdited(true);
  }

  // input에 입력된 값을 목표 수정 state에 넣어준다.
  const onChange = (e: any) => {
    const currentValue = e.target.value;
    // console.log(e.target.getAttribute("data-key"));
    const key_index = e.target.getAttribute("data-key");
    // console.log(typeof key_index);
    setNewThing(e.target.value);
  };

  // 할 일 수정 state에 바뀐 값을 수정 mutation 으로 던져주는 함수
  function changeText(e: any) {
    newToDoThing({
      variables: {
        updateToDoListInput: {
          toDoListCode: parseInt(e.target.getAttribute("data-key")),
          toDoThing: newThing,
        },
      },
    });
    // 저장 후 flag값을 다시 false로 변경해서 text가 보이도록 함
    setEdited(false);
  }

  // 할 일을 삭제하기 위해 할 일의 key 값을 서버로 던져준다.
  function deleteToDoList(e: any) {
    // console.log("e: ", e);
    toDoListCode({
      variables: {
        removeToDoListId: parseInt(e.target.getAttribute("data-key")),
      },
    });
  }

  return (
    <div>
      <div key={toDoList.toDoListCode} className="bg-slate-300">
        {!edited ? ( // flag값에 따라 text가 보이거나, input에 수정할 수 있도록 보여짐
          <>
            <div className="w-[300px] inline-block text-stone-900">할 일 : {toDoList.toDoThing}</div>
            <button className="float-right mx-1.5 text-sm bg-orange-500 p-0.5 rounded-lg text-slate-600" onClick={changeEdit}>
              수정
            </button>
          </>
        ) : (
          <>
            <input className="w-[300px] inline-block" name="newToDoThing" onChange={onChange} value={newThing} data-key={toDoList.toDoListCode} />
            <button className="float-right mx-1.5 text-sm bg-sky-500 p-0.5 rounded-lg text-slate-600" onClick={changeText} data-key={toDoList.toDoListCode}>
              저장
            </button>
          </>
        )}
        <button className="float-right mx-1.5 text-sm p-0.5 rounded-lg text-slate-600 bg-red-500" onClick={deleteToDoList} data-key={toDoList.toDoListCode}>
          삭제
        </button>
        <br />
      </div>
      <br />
    </div>
  );
}

export default ToDoListChild;

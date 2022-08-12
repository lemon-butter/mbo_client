import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const PART_LIST = gql`
  query PartList($partListId: Int!) {
    partList(id: $partListId) {
      toDoListCode
      objectiveCode
      toDoThing
    }
  }
`;

const UPDATE_TO_TO_LIST = gql`
  mutation Mutation($updateToDoListInput: UpdateToDoListInput!) {
    updateToDoList(updateToDoListInput: $updateToDoListInput)
  }
`;

const DELETE_TO_DO_LIST = gql`
  mutation RemoveToDoList($removeToDoListId: Int!) {
    removeToDoList(id: $removeToDoListId)
  }
`;

function ToDoListChild(props: any) {
  const toDoList = props.value;
  const [newThing, setThing] = useState(toDoList.toDoThing);

  const [newToDoThing] = useMutation(UPDATE_TO_TO_LIST, {
    refetchQueries: [
      {
        query: PART_LIST,
        variables: {
          partListId: toDoList.objectiveCode,
        },
      },
    ],
  });

  const [toDoListCode] = useMutation(DELETE_TO_DO_LIST, {
    refetchQueries: [
      {
        query: PART_LIST,
        variables: {
          partListId: toDoList.objectiveCode,
        },
      },
    ],
  });

  const [edited, setEdited] = useState(false); // 수정 모드 변환 플래그 값

  function changeEdit() {
    setEdited(true);
  }

  const onChange = (e: any) => {
    const currentValue = e.target.value;
    console.log(e.target.getAttribute("data-key"));
    const key_index = e.target.getAttribute("data-key");
    console.log(typeof key_index);
    setThing(e.target.value);
  };

  function changeText(e: any) {
    newToDoThing({
      variables: {
        updateToDoListInput: {
          toDoListCode: parseInt(e.target.getAttribute("data-key")),
          toDoThing: newThing,
        },
      },
    });
    setEdited(false);
  }

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
        {!edited ? (
          <>
            <div className="w-[300px] inline-block">{toDoList.toDoThing}</div>
            <button onClick={changeEdit}>수정</button>
          </>
        ) : (
          <div>
            <div>
              <input name="newToDoThing" onChange={onChange} value={newThing} data-key={toDoList.toDoListCode} />
            </div>
            <div>
              <button onClick={changeText} data-key={toDoList.toDoListCode}>
                저장
              </button>
            </div>
          </div>
        )}
        <button onClick={deleteToDoList} data-key={toDoList.toDoListCode}>
          삭제
        </button>
        <br />
      </div>
      <br />
    </div>
  );
}

export default ToDoListChild;

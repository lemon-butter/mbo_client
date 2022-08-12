import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import ToDoList from "./ToDoList";

// 전체 목표 조회
const OBJECTIVES = gql`
  {
    objectives {
      objectiveCode
      objectiveName
      percentage
    }
  }
`;

// 목표 수정
const UPDATE_OBJECTIVE = gql`
  mutation UpdateObjective($updateObjectNameInput: UpdateObjectNameInput!) {
    updateObjective(updateObjectNameInput: $updateObjectNameInput)
  }
`;

// 목표 삭제
const DELETE_OBJECTIVE = gql`
  mutation RemoveObjective($removeObjectiveId: Int!) {
    removeObjective(id: $removeObjectiveId)
  }
`;

// 진행률 값 +1
const INCRESE_PERCENTAGE = gql`
  mutation IncreasePercentage($updateObjectiveInput: UpdateObjectiveInput!) {
    increasePercentage(updateObjectiveInput: $updateObjectiveInput)
  }
`;

// 진행률 값 -1
const DECREASE_PERCENTAGE = gql`
  mutation DecreasePercentage($updateObjectiveInput: UpdateObjectiveInput!) {
    decreasePercentage(updateObjectiveInput: $updateObjectiveInput)
  }
`;

function ObjectiveChild(props: any) {
  const objective = props.value; // props로 상위 컴포넌트에서 넘겨준 값을 받는다.
  const [objName, setObjName] = useState(objective.objectiveName); // 목표 수정용 state
  const [edited, setEdited] = useState(false); // 수정 모드 변환 플래그 값

  // 목표 수정 mutation
  const [newObjectiveName] = useMutation(UPDATE_OBJECTIVE, {
    // 목표 수정 후 전체 목표 조회를 다시 호출(렌더링)
    refetchQueries: [
      {
        query: OBJECTIVES,
      },
    ],
  });

  // 목표 삭제 mutation
  const [objectiveCode] = useMutation(DELETE_OBJECTIVE, {
    // 목표 삭제 후 전체 목표 조회를 다시 호출(렌더링)
    refetchQueries: [
      {
        query: OBJECTIVES,
      },
    ],
  });

  // 진행률 +1 mutation
  const [increasePercentage] = useMutation(INCRESE_PERCENTAGE, {
    // 진행률 +1 후 전체 목표 조회를 다시 호출(렌더링)
    refetchQueries: [
      {
        query: OBJECTIVES,
      },
    ],
  });

  // 진행률 -1 mutation
  const [decreasePercentage] = useMutation(DECREASE_PERCENTAGE, {
    // 진행률 -1 후 전체 목표 조회를 다시 호출(렌더링)
    refetchQueries: [
      {
        query: OBJECTIVES,
      },
    ],
  });

  // 수정 클릭시 text => input로 변경되도록 flag값을 변경해주는 함수
  function changeEdit() {
    setEdited(true);
  }

  // input에 입력된 값을 목표 수정 state에 넣어준다.
  const onChange = (e: any) => {
    // console.log(e.target.value);
    const currentValue = e.target.value;
    // console.log(e.target.getAttribute("data-key"));
    const key_index = e.target.getAttribute("data-key");
    // console.log(typeof key_index);

    // const currentData = data.objectives.find((objective: any) => objective.objectiveCode == key_index);
    // console.log((currentData.objectiveName = currentValue));

    setObjName(e.target.value);
  };

  // 목표 수정 state에 바뀐 값을 수정 mutation 으로 던져주는 함수
  function changeText(e: any) {
    newObjectiveName({
      variables: {
        updateObjectNameInput: {
          objectiveCode: parseInt(e.target.getAttribute("data-key")),
          objectiveName: objName,
        },
      },
    });
    // 저장 후 flag값을 다시 false로 변경해서 text가 보이도록 함
    setEdited(false);
  }

  // 특정 목표에 진행률을 +1해주기 위해 목표의 key 값을 서버로 던져준다.
  function onIncrease(e: any) {
    increasePercentage({
      variables: {
        updateObjectiveInput: {
          objectiveCode: parseInt(e.target.getAttribute("data-key")),
        },
      },
    });
  }

  // 특정 목표에 진행률을 -1해주기 위해 목표의 key 값을 서버로 던져준다.
  function onDecrease(e: any) {
    decreasePercentage({
      variables: {
        updateObjectiveInput: {
          objectiveCode: parseInt(e.target.getAttribute("data-key")),
        },
      },
    });
  }

  // 목표를 삭제하기 위해 목표의 key 값을 서버로 던져준다.
  function deleteObjective(e: any) {
    objectiveCode({
      variables: {
        removeObjectiveId: parseInt(e.target.getAttribute("data-key")),
      },
    });
  }

  return (
    <div>
      <div key={objective.objectiveCode} className="bg-slate-700">
        {!edited ? ( // flag값에 따라 text가 보이거나, input에 수정할 수 있도록 보여짐
          <>
            <div className="w-[500px] inline-block">목표 : {objective.objectiveName}</div>
            <button onClick={changeEdit}>수정</button>
          </>
        ) : (
          <>
            <input className="w-[500px] inline-block" name="newOnjName" onChange={onChange} value={objName} data-key={objective.objectiveCode} />
            <button onClick={changeText} data-key={objective.objectiveCode}>
              저장
            </button>
          </>
        )}
        <button>완료</button>
        <button onClick={deleteObjective} data-key={objective.objectiveCode}>
          삭제
        </button>
        <div>
          <button onClick={onDecrease} data-key={objective.objectiveCode}>
            -
          </button>
          <div>{objective.percentage}%</div>
          <button onClick={onIncrease} data-key={objective.objectiveCode}>
            +
          </button>
        </div>
        {/* 하위 컴포넌트에 value로 값을 전달해 준다. */}
        <ToDoList value={objective.objectiveCode} />
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default ObjectiveChild;

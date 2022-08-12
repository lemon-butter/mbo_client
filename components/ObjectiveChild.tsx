import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import ToDoList from "./ToDoList";

const OBJECTIVES = gql`
  {
    objectives {
      objectiveCode
      objectiveName
      percentage
    }
  }
`;

const UPDATE_OBJECTIVE = gql`
  mutation UpdateObjective($updateObjectNameInput: UpdateObjectNameInput!) {
    updateObjective(updateObjectNameInput: $updateObjectNameInput)
  }
`;

const DELETE_OBJECTIVE = gql`
  mutation RemoveObjective($removeObjectiveId: Int!) {
    removeObjective(id: $removeObjectiveId)
  }
`;

const INCRESE_PERCENTAGE = gql`
  mutation IncreasePercentage($updateObjectiveInput: UpdateObjectiveInput!) {
    increasePercentage(updateObjectiveInput: $updateObjectiveInput)
  }
`;

const DECREASE_PERCENTAGE = gql`
  mutation DecreasePercentage($updateObjectiveInput: UpdateObjectiveInput!) {
    decreasePercentage(updateObjectiveInput: $updateObjectiveInput)
  }
`;

function ObjectiveChild(props: any) {
  const objective = props.value;

  const [objectiveCode] = useMutation(DELETE_OBJECTIVE, {
    refetchQueries: [
      {
        query: OBJECTIVES,
      },
    ],
  });

  const [newObjectiveName] = useMutation(UPDATE_OBJECTIVE, {
    refetchQueries: [
      {
        query: OBJECTIVES,
      },
    ],
  });

  const [increasePercentage] = useMutation(INCRESE_PERCENTAGE, {
    refetchQueries: [
      {
        query: OBJECTIVES,
      },
    ],
  });

  const [decreasePercentage] = useMutation(DECREASE_PERCENTAGE, {
    refetchQueries: [
      {
        query: OBJECTIVES,
      },
    ],
  });

  const [objName, setObjName] = useState(objective.objectiveName);
  const [edited, setEdited] = useState(false); // 수정 모드 변환 플래그 값

  function changeEdit() {
    setEdited(true);
  }

  const onChange = (e: any) => {
    console.log(e.target.value);
    const currentValue = e.target.value;
    console.log(e.target.getAttribute("data-key"));
    const key_index = e.target.getAttribute("data-key");
    console.log(typeof key_index);

    // const currentData = data.objectives.find((objective: any) => objective.objectiveCode == key_index);
    // console.log((currentData.objectiveName = currentValue));

    setObjName(e.target.value);
  };

  function changeText(e: any) {
    newObjectiveName({
      variables: {
        updateObjectNameInput: {
          objectiveCode: parseInt(e.target.getAttribute("data-key")),
          objectiveName: objName,
        },
      },
    });
    setEdited(false);
  }

  function onIncrease(e: any) {
    increasePercentage({
      variables: {
        updateObjectiveInput: {
          objectiveCode: parseInt(e.target.getAttribute("data-key")),
        },
      },
    });
  }

  function onDecrease(e: any) {
    decreasePercentage({
      variables: {
        updateObjectiveInput: {
          objectiveCode: parseInt(e.target.getAttribute("data-key")),
        },
      },
    });
  }

  function deleteObjective(e: any) {
    objectiveCode({
      variables: {
        removeObjectiveId: parseInt(e.target.getAttribute("data-key")),
      },
    });
  }

  return (
    <div>
      <div key={objective.objectiveCode}>
        {!edited ? (
          <div>
            <div>{objective.objectiveName}</div>
            <div>
              <button onClick={changeEdit}>수정</button> {/* 수정모드로 변경 */}
            </div>
          </div>
        ) : (
          <div>
            <div>
              <input name="newOnjName" onChange={onChange} value={objName} data-key={objective.objectiveCode} />
            </div>
            <div>
              <button onClick={changeText} data-key={objective.objectiveCode}>
                저장
              </button>
              {/* 보기모드로 변경 */}
            </div>
          </div>
        )}
        <div>
          <button onClick={onDecrease} data-key={objective.objectiveCode}>
            -
          </button>
          <div>{objective.percentage}%</div>
          <button onClick={onIncrease} data-key={objective.objectiveCode}>
            +
          </button>
        </div>
        <ToDoList value={objective.objectiveCode} />
        <br />
        <button>완료</button>
        <button onClick={deleteObjective} data-key={objective.objectiveCode}>
          삭제
        </button>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default ObjectiveChild;

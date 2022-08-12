import { gql, useMutation, useQuery } from "@apollo/client";
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

const ADD_OBJECTIVE = gql`
  mutation CreateObjective($createObjectiveInput: CreateObjectiveInput!) {
    createObjective(createObjectiveInput: $createObjectiveInput) {
      objectiveCode
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

export default function Objective() {
  const [newObj, setNewObj] = useState("");
  const [objName, setObjName] = useState("");
  const { data, loading, error } = useQuery(OBJECTIVES);
  const [edited, setEdited] = useState(false); // 수정 모드 변환 플래그 값

  const [objectiveName] = useMutation(ADD_OBJECTIVE, {
    refetchQueries: [
      {
        query: OBJECTIVES,
      },
    ],
  });

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

  function addObjective() {
    objectiveName({
      variables: {
        createObjectiveInput: {
          objectiveName: newObj,
        },
      },
    });
    setNewObj("");
  }

  const onChange = (e: any) => {
    console.log(e.target.value);
    setObjName(e.target.value);
  };

  function deleteObjective(e: any) {
    objectiveCode({
      variables: {
        removeObjectiveId: parseInt(e.target.getAttribute("data-key")),
      },
    });
  }

  function changeEdit() {
    setEdited(true);
  }

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

  // 로딩중
  if (loading) return <p>Loading...</p>;

  // 에러
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div>
        {data?.objectives?.map((objective: any) => (
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
                  <input name="newOnjName" onChange={onChange} value={objective.objectiveName} />
                </div>
                <div>
                  <button onClick={changeText} data-key={objective.objectiveCode}>
                    저장
                  </button>
                  {/* 보기모드로 변경 */}
                </div>
                <b>값: {objName}</b>
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
            <button>완료</button>
            <button onClick={deleteObjective} data-key={objective.objectiveCode}>
              삭제
            </button>
          </div>
        ))}
      </div>
      <div>
        <label>목표추가!</label>
        <input name="newObjective" onChange={(event) => setNewObj(event.target.value)} placeholder="목표를 추가하세요!" value={newObj} />
        <button onClick={addObjective}>추가</button>
      </div>
    </div>
  );
}

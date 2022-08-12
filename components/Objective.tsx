import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import ObjectiveChild from "./ObjectiveChild";

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
// 목표 추가
const ADD_OBJECTIVE = gql`
  mutation CreateObjective($createObjectiveInput: CreateObjectiveInput!) {
    createObjective(createObjectiveInput: $createObjectiveInput) {
      objectiveCode
    }
  }
`;

export default function Objective() {
  const { data, loading, error } = useQuery(OBJECTIVES); // 전체 조회 query

  const [newObj, setNewObj] = useState(""); // 목표 추가용 state

  // 목표 추가 mutation
  const [objectiveName] = useMutation(ADD_OBJECTIVE, {
    // 목표 추가 후 전체 목표 조회를 다시 호출(렌더링)
    refetchQueries: [
      {
        query: OBJECTIVES,
      },
    ],
  });

  // 목표 추가 함수
  function addObjective() {
    objectiveName({
      variables: {
        createObjectiveInput: {
          objectiveName: newObj,
        },
      },
    });
    setNewObj(""); // input에 값을 서버에 넘겨주고 나서 input를 다시 비워줌
  }

  // 로딩중
  if (loading) return <p>Loading...</p>;

  // 에러
  if (error) return <p>Error :(</p>;

  return (
    <div className="bg-slate-900">
      <div>
        <br />
        <br />
        {data?.objectives?.map((objective: any) => (
          // map으로 받아오면 하위 항목을 감쌀 때 key값을 넣어줘야 에러가 안남
          // 하위 컴포넌트에 value로 값을 전달해 준다.
          <ObjectiveChild key={objective.objectiveCode} value={objective} />
        ))}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <label>목표추가!</label>
        <input name="newObjective" onChange={(event) => setNewObj(event.target.value)} placeholder="목표를 추가하세요!" value={newObj} />
        <button onClick={addObjective}>추가</button>
      </div>
    </div>
  );
}

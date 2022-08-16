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

// 해당 유저 목표 조회
const SELECT_OBJECTIVES = gql`
  query SelectObjectives($selectObjectivesId: Int!) {
    selectObjectives(id: $selectObjectivesId) {
      objectiveCode
      userFlag
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
      userFlag
    }
  }
`;

export default function Objective(props: any) {
  const { data, loading, error } = useQuery(SELECT_OBJECTIVES, {
    // 전체 조회 query
    variables: {
      selectObjectivesId: parseInt(props.value),
    },
  });
  const [newObj, setNewObj] = useState(""); // 목표 추가용 state

  // 목표 추가 mutation
  const [objectiveName] = useMutation(ADD_OBJECTIVE, {
    // 목표 추가 후 전체 목표 조회를 다시 호출(렌더링)
    refetchQueries: [
      {
        query: SELECT_OBJECTIVES,
        variables: {
          selectObjectivesId: parseInt(props.value),
        },
      },
    ],
  });

  // 목표 추가 함수
  function addObjective() {
    objectiveName({
      variables: {
        createObjectiveInput: {
          objectiveName: newObj,
          userFlag: parseInt(props.value),
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
        {data?.selectObjectives?.map((objective: any) => (
          // map으로 받아오면 하위 항목을 감쌀 때 key값을 넣어줘야 에러가 안남
          // 하위 컴포넌트에 value로 값을 전달해 준다.
          <ObjectiveChild key={objective.objectiveCode} value={objective} />
        ))}
      </div>
      <div className="pl-5 py-5">
        <label>목표추가!</label>
        <input className="border-2 border-rose-500 rounded-lg w-[300px] ml-3" name="newObjective" onChange={(event) => setNewObj(event.target.value)} placeholder="목표를 추가하세요!" value={newObj} />
        <button className="mx-3 text-sm bg-sky-800 p-0.5 rounded-lg" onClick={addObjective}>
          추가
        </button>
      </div>
    </div>
  );
}

import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import ObjectiveChild from "./ObjectiveChild";

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

export default function Objective() {
  const [newObj, setNewObj] = useState("");
  const { data, loading, error } = useQuery(OBJECTIVES);

  const [objectiveName] = useMutation(ADD_OBJECTIVE, {
    refetchQueries: [
      {
        query: OBJECTIVES,
      },
    ],
  });

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

  // 로딩중
  if (loading) return <p>Loading...</p>;

  // 에러
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div>
        <br />
        <br />
        {data?.objectives?.map((objective: any) => (
          <ObjectiveChild value={objective}></ObjectiveChild>
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

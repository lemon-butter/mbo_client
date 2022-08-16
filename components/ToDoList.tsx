import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import ToDoListChild from "./ToDoListChild";

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
// 할 일 추가
const ADD_TO_DO_LIST = gql`
  mutation CreateToDoList($createToDoListInput: CreateToDoListInput!) {
    createToDoList(createToDoListInput: $createToDoListInput) {
      objectiveCode
      toDoThing
    }
  }
`;

export default function ToDoList(props: any) {
  // 목표 번호를 props 로 받아옴
  // console.log("props", props);

  const [thing, setThing] = useState(""); // 할 일 추가용 state

  const { data, loading, error } = useQuery(PART_LIST, {
    // 할 일 조회 query
    // 목표에 맞는 할 일들을 조회 하기 위해 목표 번호를 넣어준다.
    variables: {
      partListId: props.value,
    },
  });

  // 할 일 추가 mutation
  const [addTodoThing] = useMutation(ADD_TO_DO_LIST, {
    // 목표 추가 후 전체 할 일 조회를 다시 호출
    refetchQueries: [
      {
        // 할 일 조회 호출 시 해당 목표 번호를 같이 던져줘야 함
        query: PART_LIST,
        variables: {
          partListId: props.value,
        },
      },
    ],
  });

  // 할 일 추가 함수
  function addThing(e: any) {
    addTodoThing({
      variables: {
        createToDoListInput: {
          objectiveCode: parseInt(e.target.getAttribute("data-key")),
          toDoThing: thing,
        },
      },
    });
    setThing(""); // input에 값을 서버에 넘겨주고 나서 input를 다시 비워줌
  }

  // 로딩중
  if (loading) return <p>Loading...</p>;

  // 에러
  if (error) return <p>Error :(</p>;

  return (
    <div className="bg-slate-500">
      <h2>할 일 목록</h2>
      <div>
        {data?.partList?.map((toDoList: any) => (
          // map으로 받아오면 하위 항목을 감쌀 때 key값을 넣어줘야 에러가 안남
          // 하위 컴포넌트에 value로 값을 전달해 준다.
          <ToDoListChild key={toDoList.toDoListCode} value={toDoList} />
        ))}
        <div>
          <label>할 일 추가!</label>
          <input className="border-2 border-amber-400 rounded-lg w-[300px] ml-3" name="newToDoThing" onChange={(event) => setThing(event.target.value)} placeholder="새로운 할 일을 추가해주세요." value={thing} />
          <button className="mx-3 text-sm bg-sky-800 p-0.5 rounded-lg" onClick={addThing} data-key={props.value}>
            추가
          </button>
        </div>
      </div>
    </div>
  );
}

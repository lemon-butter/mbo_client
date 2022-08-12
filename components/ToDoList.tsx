import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

const PART_LIST = gql`
  query PartList($partListId: Int!) {
    partList(id: $partListId) {
      toDoListCode
      objectiveCode
      toDoThing
    }
  }
`;

const ADD_TO_DO_LIST = gql`
  mutation CreateToDoList($createToDoListInput: CreateToDoListInput!) {
    createToDoList(createToDoListInput: $createToDoListInput) {
      objectiveCode
      toDoThing
    }
  }
`;

const DELETE_TO_DO_LIST = gql`
  mutation RemoveToDoList($removeToDoListId: Int!) {
    removeToDoList(id: $removeToDoListId)
  }
`;

export default function ToDoList(props: any) {
  console.log("props", props);

  const [thing, setThing] = useState("");

  const { data, loading, error } = useQuery(PART_LIST, {
    variables: {
      partListId: props.value,
    },
  });

  const [addTodoThing] = useMutation(ADD_TO_DO_LIST, {
    refetchQueries: [
      {
        query: PART_LIST,
        variables: {
          partListId: props.value,
        },
      },
    ],
  });

  const [toDoListCode] = useMutation(DELETE_TO_DO_LIST, {
    refetchQueries: [
      {
        query: PART_LIST,
        variables: {
          partListId: props.value,
        },
      },
    ],
  });

  function addThing(e: any) {
    addTodoThing({
      variables: {
        createToDoListInput: {
          objectiveCode: parseInt(e.target.getAttribute("data-key")),
          toDoThing: thing,
        },
      },
    });
    setThing("");
  }

  function deleteToDoList(e: any) {
    // console.log("e: ", e);
    toDoListCode({
      variables: {
        removeToDoListId: parseInt(e.target.getAttribute("data-key")),
      },
    });
  }

  // 로딩중
  if (loading) return <p>Loading...</p>;
  console.log("data: ", data);

  // 에러
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>할 일 목록이 여기에 쫘라락!</h2>
      <div>
        {data?.partList?.map((toDoList: any) => (
          <div key={toDoList.toDoListCode}>
            <div>{toDoList.toDoThing}</div>
            <div>
              <button>수정</button>
              <button onClick={deleteToDoList} data-key={toDoList.toDoListCode}>
                삭제
              </button>
            </div>
            <br />
          </div>
        ))}
        <div>
          <label>할 일 추가!</label>
          <input name="newToDoThing" onChange={(event) => setThing(event.target.value)} placeholder="새로운 할 일을 추가해주세요." value={thing} />
          <button onClick={addThing} data-key={props.value}>
            추가
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import Objective from "../../components/Objective";

export default function Seongho() {
  const [user1, setUser1] = useState("0");
  const [user2, setUser2] = useState("0");

  function handleChangeSelect1(e: any) {
    setUser1(e.target.value);
  }
  function handleChangeSelect2(e: any) {
    setUser2(e.target.value);
  }

  return (
    <>
      <style jsx global>{`
        html,
        body,
        #__next {
          height: 100%;
        }
      `}</style>
      <div className="flex h-full">
        <div className="w-1/2 h-full overflow-y-auto">
          <select onChange={handleChangeSelect1}>
            <option defaultChecked value="0">
              선택
            </option>
            <option value="1">김정범</option>
            <option value="2">하성호</option>
          </select>
          {user1 === "0" ? (
            <div>선택해라!</div>
          ) : (
            <div>
              <Objective value={user1} />
            </div>
          )}
        </div>
        <div className="w-1/2 h-full overflow-y-auto">
          <select onChange={handleChangeSelect2}>
            <option defaultChecked value="0">
              선택
            </option>
            <option value="1">김정범</option>
            <option value="2">하성호</option>
          </select>
          {user2 === "0" ? (
            <div>선택해라!</div>
          ) : (
            <div>
              <Objective value={user2} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

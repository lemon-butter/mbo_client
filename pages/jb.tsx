import { gql, useQuery } from "@apollo/client";
import Layout from "../components/layout/common";

const MEMBER = gql`
  query getMbo {
    allMembers {
      memberCode
      memberName
    }
  }
`;
const MBO_LIST = gql`
  query getMboList($memberCodes: Array) {
    memberFromCodes(memberCodes: $memberCodes) {
      memberCode
      memberName
    }
  }
`;

export default function Mbo_jb() {
  const { loading, data } = useQuery(MEMBER);

  if (loading) {
    return "Loading...";
  }

  const keys = data.allMembers.map((item: { memberCode: [] }) => item.memberCode);

  console.log(keys);

  const res2 = useQuery(MBO_LIST, {
    variables: {
      memberCodes: keys,
    },
  });

  if (res2.loading) {
    return "loading2";
  }

  console.log(res2.data);

  // console.log(data.allMembers.map((item) => item.memberCode));

  // console.log(data2);

  return (
    <Layout>
      <div>123</div>
      <div>123</div>
    </Layout>
  );
}

import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>한마디하심</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
      </Head>
      <main>
        {/* <Header /> */}
        <div className="mainContent px-5 pb-14 overflow-hidden">{children}</div>
        {/* <Footer /> */}
      </main>
    </>
  );
}

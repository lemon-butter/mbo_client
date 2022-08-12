import { useRouter } from "next/router";

import { faArrowLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const router = useRouter();
  let activeItem;

  if (router.pathname === "/") {
    activeItem = "home";
  } else if (router.pathname === "/admin") {
    activeItem = "admin";
  } else if (router.pathname === "/login") {
    activeItem = "login";
  } else if (router.pathname === "/making") {
    activeItem = "making";
  } else if (router.pathname === "/show") {
    activeItem = "show";
  }

  return (
    <>
      {router.pathname === "/" ? (
        <>
          {/* <div>
            <img src="/img/header.jpg" alt="샘플 삭제용" width="100%" />
          </div> */}
          <header>
            <ul className="h-14 px-5 flex flex-row">
              <li className="basis-10/12 flex items-center">
                <img src="/img/hasim_logo.png" alt="하심로고" className="w-11" />
              </li>
              <li className="basis-2/12 flex items-center justify-end">
                <div>
                  <span className="flex justify-center text-lg">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </span>
                  <label className="text-[10px]">강의검색</label>
                </div>
              </li>
            </ul>
          </header>
        </>
      ) : (
        <>
          {/* <div>
            <img src="/img/header.jpg" alt="샘플 삭제용" width="100%" />
          </div> */}
          <header>
            <ul className="h-14 px-5 flex flex-row">
              <li className="basis-1/12 flex items-center justify-center">
                <a className="inline-block text-base text-center leading-[0rem]">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </a>
              </li>
              <li className="basis-10/12 text-2xl flex items-center justify-center">
                <h2>한밭제일장로교회</h2>
              </li>
              <li className="basis-1/12 flex items-center justify-center"></li>
            </ul>
          </header>
        </>
      )}

      {/*<nav className="navbar navbar-expand-lg navbar-light bg-light">*/}
      {/*    <div className="container-fluid" style={{width:"1200px"}}>*/}
      {/*        <a className="navbar-brand" href="#">TWOSOUL</a>*/}
      {/*        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"*/}
      {/*                data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"*/}
      {/*                aria-label="Toggle navigation">*/}
      {/*            <span className="navbar-toggler-icon"></span>*/}
      {/*        </button>*/}

      {/*        <div className="collapse navbar-collapse" id="navbarText">*/}
      {/*            <ul className="navbar-nav me-auto mb-2 mb-lg-0">*/}
      {/*            <li className="nav-item">*/}
      {/*                    <Link href="/">*/}
      {/*                        <a className={`nav-link ${activeItem==="home"?styles.on:''}`} aria-current="page" href="#">*/}
      {/*                            Home*/}
      {/*                        </a>*/}
      {/*                    </Link>*/}
      {/*                </li>*/}
      {/*                <li className="nav-item">*/}
      {/*                    <Link href="/admin">*/}
      {/*                        <a className={`nav-link ${activeItem==="home"?styles.on:''}`} aria-current="page" href="#">*/}
      {/*                            Admin(로그인)*/}
      {/*                        </a>*/}
      {/*                    </Link>*/}
      {/*                </li>*/}
      {/*                <li className="nav-item">*/}
      {/*                    <Link href="/making">*/}
      {/*                        <a className={`nav-link ${activeItem==="making"?styles.on:''}`} aria-current="page" href="#">*/}
      {/*                            Making*/}
      {/*                        </a>*/}
      {/*                    </Link>*/}
      {/*                </li>*/}
      {/*                <li className="nav-item">*/}
      {/*                    <Link href="/board">*/}
      {/*                        <a className={`nav-link ${activeItem==="board"?styles.on:''}`} aria-current="page" href="#">*/}
      {/*                            board*/}
      {/*                        </a>*/}
      {/*                    </Link>*/}
      {/*                </li>*/}
      {/*            </ul>*/}
      {/*            <span className="navbar-text">*/}
      {/*                Navbar text with an inline element*/}
      {/*            </span>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</nav>*/}
    </>
  );
}

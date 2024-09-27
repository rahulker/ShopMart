import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { handleShowModal } from "../../Store/Store";
import { HiXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useRouteLoaderData } from "react-router";
import SearchItem from "../Custom/SearchItem";
const Modal = () => {
  const dispacth = useDispatch();
  const [searchData, setSearchData] = useState("");
  const data = useRouteLoaderData("root");
  const searchDataArr = data.filter((item) =>
    item.title.toLowerCase().includes(searchData.toLowerCase())
  );
  function handleKeyDown(e) {
    if (e.key === "Escape") {
      dispacth(handleShowModal());
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="modal__backdrop">
      <div className="modal__container">
        <div className="grid sm:grid-cols-[91%_5%] grid-cols-[auto_5%] gap-6 items-center">
          <div className="bg-[#F0F5FF] grid grid-cols-[10%_auto] sm:grid-cols-[5%_93.5%] items-center gap-2 pl-2.5  lg:min-w-[400px]">
            <CiSearch size={25} />
            <span className="border-l border-gray-300">
              <input
                type="text"
                className="bg-transparent w-full p-2 pr-0 focus:border-none placeholder:text-black"
                autoFocus
                placeholder="Search"
                onChange={(e) => setSearchData(e.target.value)}
              />
            </span>
          </div>
          <div
            onClick={() => dispacth(handleShowModal())}
            className="cursor-pointer"
          >
            <HiXMark size={25} />
          </div>
        </div>
        <div className="mt-4">
          {searchDataArr.length > 0
            ? searchDataArr
                .slice(0, 5)
                .map((item) => (
                  <SearchItem
                    item={item}
                    key={item.id}
                    onChange={setSearchData}
                    dispacth={dispacth}
                    handleShowModal={handleShowModal}
                  />
                ))
            : data
                .slice(0, 5)
                .map((item) => (
                  <SearchItem
                    item={item}
                    key={item.id}
                    dispacth={dispacth}
                    handleShowModal={handleShowModal}
                  />
                ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;

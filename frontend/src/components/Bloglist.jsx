import List from "./List";

const lists = [
  { id: 1, title: "lorem", content: "ipsum" },
  { id: 2, title: "lorem", content: "ipsum" },
  { id: 3, title: "lorem", content: "ipsum" },
  { id: 4, title: "lorem", content: "ipsum" },
  { id: 5, title: "lorem", content: "ipsum" },
  { id: 6, title: "lorem", content: "ipsum" },
  { id: 7, title: "lorem", content: "ipsum" },
  { id: 8, title: "lorem", content: "ipsum" },
  { id: 9, title: "lorem", content: "ipsum" },
  { id: 10, title: "lorem", content: "ipsum" },
  { id: 11, title: "lorem", content: "ipsum" },
  { id: 12, title: "lorem", content: "ipsum" },
];

function Bloglist() {
  return (
    <div className="flex justify-center items-center h-screen overflow-y-auto mt-10">
      <div className="flex flex-col justify-center mt-[500px]">
        {lists.map((list) => (
          <List key={list.id} item={list} />
        ))}
      </div>
    </div>
  );
}

export default Bloglist;

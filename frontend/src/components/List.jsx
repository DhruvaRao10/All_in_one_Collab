import { Link } from "react-router-dom";

function List({ item }) {
  return (
    // <div>
    //   {/* <a href={`blog/${item.id}`}>{item.content}</a> */}

    // </div>
    <Link to={`${item.id}`}>
      <div className="card w-[850px] h-[80px] shadow-xl bg-slate-100 mb-4">
        <div className="card-body">
          <h2 className="card-title">{item.title}</h2>
          <p>{item.content}</p>
        </div>
      </div>
    </Link>
  );
}

export default List;

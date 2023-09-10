import classNames from "classnames";

export default function Body() {
  return (
    <div className="w-full h-[500px] overflow-y-scroll px-5 py-5">
      <Message message="Hello" author="CLIENT" />
      <Message message="World" author="SERVER" />
      <Message message="World" author="CLIENT" />
      <Message
        message="My Name is Hiten lorem ipsum dolor sit fwe wefweg "
        author="CLIENT"
      />
    </div>
  );

  function Message({
    message,
    author,
  }: {
    message: string;
    author: "CLIENT" | "SERVER";
  }) {
    return (
      <div className="w-full flex items-center justify-center mt-4 first:mt-0">
        {author === "CLIENT" && <div className="flex flex-1" />}
        <span
          className={classNames("block px-4 py-3 rounded-2xl max-w-xs", {
            "bg-slate-900 text-white": author === "SERVER",
            "border-2 border-slate-900 text-slate-900": author === "CLIENT",
          })}
        >
          {message}
        </span>
        {author === "SERVER" && <div className="flex flex-1" />}
      </div>
    );
  }
}

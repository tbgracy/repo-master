type SearchbarProps = {
  onSelect: (type: Filter["type"]) => void;
  onTyping: (keyword: string) => void;
};

export const Searchbar = (props: SearchbarProps) => {
  const { onSelect, onTyping } = props;

  const selectValues = ["All", "Public", "Private", "Archived"];

  return (
    <div className="mx-auto w-full md:w-[60%] md:absolute bg-white md:top-1 md:left-[50%] md:translate-x-[-50%] z-20 flex shadow md:shadow-none">
      <input
        className="m-2 p-2 rounded border flex-grow outline-none"
        type="text"
        placeholder="Find a repository ... "
        onChange={(e) => onTyping(e.target.value)}
      />
      <select
        name=""
        id=""
        className="m-2 p-2 rounded cursor-pointer"
        onChange={(e) => {
          const newValue = e.target.value.toLowerCase();
          if (newValue !== "all") onSelect(newValue as Filter["type"]);
          else onSelect(undefined);
        }}
      >
        {selectValues.map((v) => (
          <option value={v}>{v}</option>
        ))}
      </select>
    </div>
  );
};

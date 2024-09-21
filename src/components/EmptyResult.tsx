import noResultImage from "../assets/void.svg";

export const EmptyResult = () => {
  return (
    <div className="flex flex-col items-center h-full justify-center gap-4">
      <img src={noResultImage} className="size-[10rem]" />
      <p>No repository found.</p>
    </div>
  );
};

type ResultCountProps = {
  filter: Filter;
  contentCount: number;
};

export const ResultCount = (props: ResultCountProps) => {
  const { filter, contentCount } = props;
  return (
    <p className="text-center mt-3">
      {(filter.keyword || filter.type) &&
        contentCount > 0 &&
        `${contentCount} repositor${contentCount > 1 ? "ies" : "y"} found`}
    </p>
  );
};

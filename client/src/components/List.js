export const List = (props) => {
  if (!props.list) return null;
  return (
    <div>
      {props.list.map(({ id }) => (
        <div>{id}</div>
      ))}
    </div>
  );
};

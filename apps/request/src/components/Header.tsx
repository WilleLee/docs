import useNav from "@hooks/useNav";

export default function Header({ onClickBack }: { onClickBack?: () => void }) {
  const { push } = useNav();
  return (
    <header>
      <button onClick={onClickBack}>back</button>
      <button onClick={() => push("/")}>home</button>
    </header>
  );
}

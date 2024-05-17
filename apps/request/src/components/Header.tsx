import useNav from "@hooks/useNav";

export default function Header() {
  const { push } = useNav();
  return (
    <header>
      <button onClick={() => push("/")}>home</button>
    </header>
  );
}

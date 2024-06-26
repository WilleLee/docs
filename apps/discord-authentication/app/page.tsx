import { discord } from "@libs/actions";

export default function HomePage() {
  return (
    <div>
      <form action={discord}>
        <button type="submit">discord</button>
      </form>
    </div>
  );
}

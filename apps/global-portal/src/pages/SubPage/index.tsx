import { useNavigate } from "react-router-dom";

export default function SubPage() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>go back</button>
    </div>
  );
}

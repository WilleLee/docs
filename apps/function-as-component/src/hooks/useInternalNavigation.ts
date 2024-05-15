import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

type Path = `/${string}`;

export default function useInternalNavigation() {
  const navigate = useNavigate();
  return useMemo(
    () => ({
      push: (path: Path) => navigate(path),
      back: () => navigate(-1),
      replace: (path: Path) =>
        navigate(path, {
          replace: true,
        }),
    }),
    [navigate],
  );
}

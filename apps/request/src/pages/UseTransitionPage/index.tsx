import {
  Component,
  ErrorInfo,
  Fragment,
  ReactNode,
  Suspense,
  useState,
  useTransition,
} from "react";

export default function UseTransitionPage() {
  return (
    <Suspense fallback={<p>eh</p>}>
      <Content />
    </Suspense>
  );
}

interface ITab {
  id: number;
  name: string;
}

function Content() {
  const tabs: ITab[] = [
    {
      id: 0,
      name: "main",
    },
    { id: 1, name: "sub" },
  ];
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<ITab["id"]>(0);
  function updateTab(id: ITab["id"]) {
    startTransition(() => {
      setTab(id);
    });
  }
  let content: ReactNode | null = null;
  for (let i = 0; i < tabs.length; i++) {
    if (tab === tabs[i].id) {
      content = <p>{tabs[i].name}</p>;
      break;
    }
  }

  return (
    <Fragment>
      <header>
        {tabs.map((t) => (
          <button
            disabled={isPending}
            key={t.id}
            onClick={() => {
              updateTab(t.id);
            }}
          >
            {t.name}
          </button>
        ))}
        <button onClick={() => updateTab(29)}>bad button</button>
      </header>
      <Fragment key={tab}>
        <ErrorBoundary fallback={<p>error happened!</p>}>
          {<ContentLoader>{content}</ContentLoader>}
        </ErrorBoundary>
      </Fragment>
    </Fragment>
  );
}

function ContentLoader({ children }: { children: ReactNode }) {
  if (!children) throw new Error("no content");
  return <div>{children}</div>;
}

interface IProps {
  children: ReactNode;
  fallback: ReactNode;
}
interface IState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("[ERROR BOUNDARY]", error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

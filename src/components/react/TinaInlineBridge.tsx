import { useTina } from 'tinacms/dist/react';

type TinaInlineBridgeProps = {
  query: string;
  variables: Record<string, unknown>;
  data: Record<string, unknown>;
};

export default function TinaInlineBridge(props: TinaInlineBridgeProps) {
  useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return null;
}


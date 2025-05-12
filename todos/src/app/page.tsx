'use client';

import { useActor } from "@xstate/react";
import { todosMachine } from "./machines/todoAppMachine";

export default function Home() {
  const [state, send] = useActor(todosMachine)
  return (
    <div>
      <pre>{JSON.stringify(state.value, null, 2)}</pre>
      <pre>{JSON.stringify(state.context, null, 2)}</pre>
    </div>
  );
}

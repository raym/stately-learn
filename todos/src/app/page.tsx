'use client';

import { useMachine } from "@xstate/react";
import { myMachine } from "./machines/myFirstMachine";

export default function Home() {
  const [state, send] = useMachine(myMachine)
  return (
    <div>
      <pre>{JSON.stringify(state.value, null, 2)}</pre>
      <div>
        <button onClick={() => send({ type: 'MOUSEOVER' })}>Mouse Over</button>
      </div>
      <div>
        <button onClick={() => send({ type: 'MOUSEOUT' })}>Mouse Out</button>
      </div>
    </div>
  );
}

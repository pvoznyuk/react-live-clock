import React, { Component } from "react";

interface Props {
  readonly blinking?: boolean | string;
  readonly className?: string;
  readonly date?: number | string;
  readonly element?: string | React.ReactElement | object;
  readonly filter?: () => void;
  readonly format?: string;
  readonly interval?: number;
  readonly locale?: string;
  readonly onChange?: (date: number) => void;
  readonly onReady?: () => void;
  readonly style?: React.CSSProperties;
  readonly ticking?: boolean;
  readonly timezone?: string;
  readonly noSsr?: boolean;
  readonly children?: string;
}

declare class SimpleSelect extends Component<Props, any> {}

export default SimpleSelect;

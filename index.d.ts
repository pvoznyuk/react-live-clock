import React, {Component} from 'react';

interface Props {
  readonly children?: string;
  readonly className?: string;
  readonly date?: number | string;
  readonly filter?: () => void;
  readonly format?: string;
  readonly interval?: number;
  readonly blinking?: boolean | string;
  readonly locale?: string;
  readonly onChange?: () => void;
  readonly style?: CSSProperties;
  readonly ticking?: boolean;
  readonly timezone?: string;
}

declare class SimpleSelect extends Component<Props, any> {}

export default SimpleSelect;

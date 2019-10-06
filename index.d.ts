import React, {Component} from 'react';

interface Props {
  readonly children?: string;
  readonly date?: number | string;
  readonly format?: string;
  readonly interval?: number;
  readonly ticking?: boolean;
  readonly timezone?: string;
  readonly filter?: () => void;
  readonly onChange?: () => void;
}

declare class SimpleSelect extends Component<Props, any> {}

export default SimpleSelect;

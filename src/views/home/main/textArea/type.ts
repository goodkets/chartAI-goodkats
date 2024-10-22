type Props = {
  onAreaTextChange: (value: string) => void;
};

// 定义 state 的类型
interface State {
  chatAI: {
    disabled?: boolean;
    messageStatus?: boolean;
  };
}
export type { Props, State };

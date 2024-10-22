interface Props  {
    text:TextItem
}
interface TextItem {
    message: string;
    avator: string;
    time: string;
    key:number
  }
export type {Props, TextItem}
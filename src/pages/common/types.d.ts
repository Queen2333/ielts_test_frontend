interface ColumnItem {
  align?: string;
  className?: string;
  fixed?: boolean | string;
  key: string;
  render?: (value: any) => void;
  title: string;
  width?: string | number
}

export { ColumnItem };
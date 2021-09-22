export default function (options: {
  title: string
  items: { text: string; value: any }[]
  selectValue: any
  cancel?: string
  onSelect?: (value: any, item: { text: string; value: any }, index: number) => void
  onCancel?: () => void
  closeAfterSelected?: boolean
  needAnimation?: boolean
}): {
  destroy: () => void
}

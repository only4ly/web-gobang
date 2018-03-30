export default interface GameViewer {
  viewContext: any
  initView(): void
  destroyView(): void
}
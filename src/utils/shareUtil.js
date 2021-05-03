/**
 * share
 * @param event
 */
export function onShare(event,that) {
  console.log(event)
  that.showShare = true
}
// close share
export function onClose(that) {
  that.showShare = false
}
/**
 * share item
 * @param event
 */
export function onSelect(event,that) {
  console.log(event.detail.name);
  that.onClose();
}
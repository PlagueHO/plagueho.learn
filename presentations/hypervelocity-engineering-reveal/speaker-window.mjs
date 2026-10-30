export function trackRelativeWindowPosition(
  sourceWindow,
  speakerWindow,
  schedule = setInterval,
  cancel = clearInterval,
) {
  const offsetX = speakerWindow.screenX - sourceWindow.screenX;
  const offsetY = speakerWindow.screenY - sourceWindow.screenY;
  let lastX = sourceWindow.screenX;
  let lastY = sourceWindow.screenY;

  // Window movement has no broadly supported event, so check the position at a low rate.
  const timer = schedule(() => {
    if (sourceWindow.closed || speakerWindow.closed) {
      cancel(timer);
      return;
    }

    const currentX = sourceWindow.screenX;
    const currentY = sourceWindow.screenY;
    if (currentX === lastX && currentY === lastY) return;

    speakerWindow.moveTo(currentX + offsetX, currentY + offsetY);
    lastX = currentX;
    lastY = currentY;
  }, 100);

  return () => cancel(timer);
}

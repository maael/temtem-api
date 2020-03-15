// Taken from the wiki's updateReward function available on Temtem pages
export default function calculateFreetemReward(
  catchRate: number,
  level: number
) {
  return 20 + Math.ceil((level / catchRate) * 300);
}

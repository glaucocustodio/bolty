export class CardBuilder {
  public static call(cardData, set) {
    return Object.assign(
      cardData,
      {
        set_id: set._id,
        user_id: set.user_id,
        memorized: false
      }
    )
  }
}

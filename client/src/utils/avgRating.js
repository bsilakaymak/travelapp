export const avgRating = (value) => {
    let totalRating = 0
    value.forEach((rating) => {
        totalRating += rating.rating
        return totalRating
    })
    const totalUsersRated = value.length
    const sum_of_max_rating_of_user_count = totalUsersRated * 5
    const rating = (totalRating * 5) / sum_of_max_rating_of_user_count
    return Math.round(rating)
}

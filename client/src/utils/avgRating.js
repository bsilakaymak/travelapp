export const avgRating = (arrOfRatings) => {
    let totalRating = 0
    arrOfRatings.forEach((rating) => {
        totalRating += rating.rating
        return totalRating
    })
    const totalUsersRated = arrOfRatings.length
    const sum_of_max_rating_of_user_count = totalUsersRated * 5
    const rating = (totalRating * 5) / sum_of_max_rating_of_user_count
    return parseInt(Math.round(rating))
}

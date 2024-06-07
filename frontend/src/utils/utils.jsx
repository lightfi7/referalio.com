import { jwtDecode } from "@/app/(auth)/utils";

export const IsLogined = () => {
    if (jwtDecode(localStorage.getItem('accessToken'))) return true;
    else return false;
}

export const countRate = (ratings) => {
    if (!ratings || !Array.isArray(ratings) || !ratings.length) {
        return 0;
    }

    // assuming you want to calculate average of the ratings here
    let total = 0;
    ratings.forEach(rating => {
        total += (Number(rating.easy_to_join) + Number(rating.relationship) + Number(rating.payment_deadline)) / 3;
    });

    const average = total / (ratings.length);
    return parseInt(average.toFixed(2));

}

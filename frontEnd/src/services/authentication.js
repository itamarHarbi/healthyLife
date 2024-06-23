import { ApiUrl, apiMethod } from "./apiServices";
import { IsSignedInContext, UserIdContext } from "../contexts";
import { useContext } from "react";

export const ValidateUser = async () => {
    const { isSignedIn, setIsSignedIn } = useContext(IsSignedInContext)
    try {
        const token = localStorage.getItem("Healthy-Token")
        if (token && token !== "undefined") {
            const valid = await apiMethod(
                `${ApiUrl}/users/auth`,
                "GET",
                {}
            )
            console.log(valid);
            if (!isSignedIn) setIsSignedIn(true)
            console.log("pass");
            return true
        }
        localStorage.removeItem("Healthy-Token")
        setIsSignedIn(false)
    }
    catch (err) {
        setIsSignedIn(false)
        console.log(err);
        throw(err)
    }
}

// export const SetUserId = (id) => {
//     let { userId } = useContext(UserIdContext);
//     userId = "000"
// }
export const LogOut = async () => {
    const { isSignedIn, setIsSignedIn } = useContext(IsSignedInContext)
    try {
        console.log("sassdas");
        localStorage.removeItem("Healthy-Token")
    }
    catch (err) {
        console.log(err);
    }
    // setIsSignedIn(false)
}
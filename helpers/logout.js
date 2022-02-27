import { Storage } from "helpers/storageUtility";

export const logout = () => {
    if (typeof window !== "undefined") {
        console.clear();
        Storage.removeItem("sifuse-user");
        Storage.removeItem("stages_answers");
        Storage.removeItem("current_stage_page");
        Storage.removeItem("levelWidth");
        location.replace('/auth/signin')
    }
}
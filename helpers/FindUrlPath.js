
const FindUrlPath = (mode, knownPath = null) => {
    console.log(mode)
    if (typeof window !== "undefined") {
        return path(mode, knownPath, window.location.pathname);
    }
}

const path = (mode, knownPath, realpath) => {
    let allowed_paths = null;

    switch (mode) {

        case "dashboard":

            allowed_paths = [
                '/dashboard', '/dashboard/residents', '/dashboard/visitors', '/dashboard/apartments',
                '/dashboard/personnel-management',      '/dashboard/payments'
             ];

            return allowed_paths.includes(realpath) ? true : false;

        case "checkUrlPath":
            return realpath === knownPath ? true : false;

        case "findurlpath":
            return realpath;

        case "auth":
            allowed_paths = [
                '/', '/auth/new-password', '/auth/login', '/auth/get-verify-code',
                '/auth/reset-password', '/auth/verify'
            ];
            return allowed_paths.includes(realpath) ? true : false;

        default:
            allowed_paths = [
                '/', '/about', '/contact'
            ];

            return allowed_paths.includes(realpath) ? true : false;
    }
}


export {
    FindUrlPath
}


//Git Origin API URL
export const gitUrl        = "https://api.github.com/";

//Github API
export const searchOrg = (query) => ( `search/users?q=${query}+type:org`);
export const getOrgLatestRepos = (query) => ( `orgs/${query}/repos`);

export const getOneResident = (id) => ( `resident/${id}` );
export const addResident = "resident/create";
export const editResident = (id) => ( `resident/edit/${id}` );
export const deleteResident = (id) => ( `resident/delete/${id}` );
export const findApartment = (query) => ( `apartment/search/${query}` );
export const findPrincipalResident = (query) => ( `resident/search/${query}` );




//Git Origin API URL
export const githubOrigin = "https://api.github.com/";

//Github API
export const searchOrg = (query) => ( `search/users?q=${query}+type:org`);
export const getOrgRepos = (query) => ( `orgs/${query}/repos?per_page=100`);

export const getTotalClosedIssueCount = (query) => (`${githubOrigin}search/issues?q=repo:${query}+type:issue+state:closed`);
export const getTotalOpenIssueCount = (query) => (`${githubOrigin}search/issues?q=repo:${query}+type:issue+state:open`);


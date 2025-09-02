export const ROOT_ROUTE = "/"

export const APP_ROUTE = "/app"

export const MANAGEMENT_ROUTE = "/management"

export const MANAGEMENT_RANKS_ROUTE = MANAGEMENT_ROUTE + "/ranks"
export const MANAGEMENT_RANK_ROUTE = MANAGEMENT_RANKS_ROUTE + "/:rankId"

export const MANAGEMENT_TIERS_ROUTE = MANAGEMENT_ROUTE + "/tiers"
export const MANAGEMENT_TIER_ROUTE = MANAGEMENT_TIERS_ROUTE + "/:tierId"

export const MANAGEMENT_OPTIONS_ROUTE = MANAGEMENT_ROUTE + "/options"
export const MANAGEMENT_OPTION_ROUTE = MANAGEMENT_OPTIONS_ROUTE + "/:optionId"

export const MANAGEMENT_VOTES_ROUTE = MANAGEMENT_ROUTE + "/votes"
export const MANAGEMENT_VOTE_ROUTE = MANAGEMENT_VOTES_ROUTE + "/:voteId"

export const MANAGEMENT_ASSIGNMENTS_ROUTE = MANAGEMENT_ROUTE + "/assignments"
export const MANAGEMENT_ASSIGNMENT_ROUTE = MANAGEMENT_ASSIGNMENTS_ROUTE + "/:assignmentId"

export const managementRankRoute = (rankId: string) => MANAGEMENT_RANK_ROUTE.replace(":rankId", rankId)
export const managementTierRoute = (tierId: string) => MANAGEMENT_TIER_ROUTE.replace(":tierId", tierId)
export const managementOptionRoute = (optionId: string) => MANAGEMENT_OPTION_ROUTE.replace(":optionId", optionId)
export const managementVoteRoute = (voteId: string) => MANAGEMENT_VOTE_ROUTE.replace(":voteId", voteId)
export const managementAssignmentRoute = (assignmentId: string) => MANAGEMENT_ASSIGNMENT_ROUTE.replace(":assignmentId", assignmentId)
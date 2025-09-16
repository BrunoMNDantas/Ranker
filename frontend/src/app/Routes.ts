export const ROOT_ROUTE = "/"

export const APP_ROUTE = "/app"

export const MANAGEMENT_ROUTE = "/management"

export const RANK_ID_PLACEHOLDER = ":rankId"
export const TIER_ID_PLACEHOLDER = ":tierId"
export const OPTION_ID_PLACEHOLDER = ":optionId"
export const VOTE_ID_PLACEHOLDER = ":voteId"
export const ASSIGNMENT_ID_PLACEHOLDER = ":assignmentId"

export const RANKS_SUB_ROUTE = "ranks"
export const TIERS_SUB_ROUTE = "tiers"
export const OPTIONS_SUB_ROUTE = "options"
export const VOTES_SUB_ROUTE = "votes"
export const ASSIGNMENTS_SUB_ROUTE = "assignments"

export const RANK_SUB_ROUTE = RANKS_SUB_ROUTE + "/" + RANK_ID_PLACEHOLDER
export const TIER_SUB_ROUTE = TIERS_SUB_ROUTE + "/" + TIER_ID_PLACEHOLDER
export const OPTION_SUB_ROUTE = OPTIONS_SUB_ROUTE + "/" + OPTION_ID_PLACEHOLDER
export const VOTE_SUB_ROUTE = VOTES_SUB_ROUTE + "/" + VOTE_ID_PLACEHOLDER
export const ASSIGNMENT_SUB_ROUTE = ASSIGNMENTS_SUB_ROUTE + "/" + ASSIGNMENT_ID_PLACEHOLDER

export const APP_RANKS_ROUTE = APP_ROUTE + "/" + RANKS_SUB_ROUTE
export const APP_RANK_ROUTE = APP_RANKS_ROUTE + "/" + RANK_ID_PLACEHOLDER

export const MANAGEMENT_RANKS_ROUTE = MANAGEMENT_ROUTE + "/" + RANKS_SUB_ROUTE
export const MANAGEMENT_RANK_ROUTE = MANAGEMENT_RANKS_ROUTE + "/" + RANK_ID_PLACEHOLDER

export const APP_TIERS_ROUTE = APP_ROUTE + "/" + TIERS_SUB_ROUTE
export const APP_TIER_ROUTE = APP_TIERS_ROUTE + "/" + TIER_ID_PLACEHOLDER

export const MANAGEMENT_TIERS_ROUTE = MANAGEMENT_ROUTE + "/" + TIERS_SUB_ROUTE
export const MANAGEMENT_TIER_ROUTE = MANAGEMENT_TIERS_ROUTE + "/" + TIER_ID_PLACEHOLDER

export const APP_OPTIONS_ROUTE = APP_ROUTE + "/" + OPTIONS_SUB_ROUTE
export const APP_OPTION_ROUTE = APP_OPTIONS_ROUTE + "/" + OPTION_ID_PLACEHOLDER

export const MANAGEMENT_OPTIONS_ROUTE = MANAGEMENT_ROUTE + "/" + OPTIONS_SUB_ROUTE
export const MANAGEMENT_OPTION_ROUTE = MANAGEMENT_OPTIONS_ROUTE + "/" + OPTION_ID_PLACEHOLDER

export const APP_VOTES_ROUTE = APP_ROUTE + "/" + VOTES_SUB_ROUTE
export const APP_VOTE_ROUTE = APP_VOTES_ROUTE + "/" + VOTE_ID_PLACEHOLDER

export const MANAGEMENT_VOTES_ROUTE = MANAGEMENT_ROUTE + "/" + VOTES_SUB_ROUTE
export const MANAGEMENT_VOTE_ROUTE = MANAGEMENT_VOTES_ROUTE + "/" + VOTE_ID_PLACEHOLDER

export const APP_ASSIGNMENTS_ROUTE = APP_ROUTE + "/" + ASSIGNMENTS_SUB_ROUTE
export const APP_ASSIGNMENT_ROUTE = APP_ASSIGNMENTS_ROUTE + "/" + ASSIGNMENT_ID_PLACEHOLDER

export const MANAGEMENT_ASSIGNMENTS_ROUTE = MANAGEMENT_ROUTE + "/" + ASSIGNMENTS_SUB_ROUTE
export const MANAGEMENT_ASSIGNMENT_ROUTE = MANAGEMENT_ASSIGNMENTS_ROUTE + "/" + ASSIGNMENT_ID_PLACEHOLDER

export const appRankRoute = (rankId: string) => APP_RANK_ROUTE.replace(RANK_ID_PLACEHOLDER, rankId)
export const appTierRoute = (tierId: string) => APP_TIER_ROUTE.replace(TIER_ID_PLACEHOLDER, tierId)
export const appOptionRoute = (optionId: string) => APP_OPTION_ROUTE.replace(OPTION_ID_PLACEHOLDER, optionId)
export const appVoteRoute = (voteId: string) => APP_VOTE_ROUTE.replace(VOTE_ID_PLACEHOLDER, voteId)
export const appAssignmentRoute = (assignmentId: string) => APP_ASSIGNMENT_ROUTE.replace(ASSIGNMENT_ID_PLACEHOLDER, assignmentId)

export const managementRankRoute = (rankId: string) => MANAGEMENT_RANK_ROUTE.replace(RANK_ID_PLACEHOLDER, rankId)
export const managementTierRoute = (tierId: string) => MANAGEMENT_TIER_ROUTE.replace(TIER_ID_PLACEHOLDER, tierId)
export const managementOptionRoute = (optionId: string) => MANAGEMENT_OPTION_ROUTE.replace(OPTION_ID_PLACEHOLDER, optionId)
export const managementVoteRoute = (voteId: string) => MANAGEMENT_VOTE_ROUTE.replace(VOTE_ID_PLACEHOLDER, voteId)
export const managementAssignmentRoute = (assignmentId: string) => MANAGEMENT_ASSIGNMENT_ROUTE.replace(ASSIGNMENT_ID_PLACEHOLDER, assignmentId)
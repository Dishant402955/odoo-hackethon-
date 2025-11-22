import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import EmailVerification from "supertokens-node/recipe/emailverification";
import type { TypeInput } from "supertokens-node/types";

export function getApiDomain() {
	const apiPort = 3000;
	return `http://localhost:${apiPort}`;
}

export function getWebsiteDomain() {
	const websitePort = 3000;
	return `http://localhost:${websitePort}`;
}

export const SuperTokensConfig: TypeInput = {
	supertokens: {
		connectionURI: "http://localhost:3567",
		apiKey: "this-is-key-1-for-supertokens",
	},
	appInfo: {
		appName: "SuperTokens Demo App",
		apiDomain: getApiDomain(),
		websiteDomain: getWebsiteDomain(),
		apiBasePath: "/api/auth/",
		websiteBasePath: "/auth",
	},
	recipeList: [
		EmailPassword.init(),
		UserRoles.init(),
		Session.init(),
		Dashboard.init({
			apiKey: "this-is-key-1-for-supertokens",
		}),
		EmailVerification.init({
			mode: "REQUIRED",
		}),
	],
};

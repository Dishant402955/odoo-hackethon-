"use client";

import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";

export function getApiDomain() {
	const apiPort = 3000;
	const apiUrl = `http://localhost:${apiPort}`;
	return apiUrl;
}

export function getWebsiteDomain() {
	const websitePort = 3000;
	const websiteUrl = `http://localhost:${websitePort}`;
	return websiteUrl;
}

export const SuperTokensConfig = {
	appInfo: {
		appName: "SuperTokens Demo App",
		apiDomain: getApiDomain(),
		websiteDomain: getWebsiteDomain(),
		apiBasePath: "/api/auth/",
		websiteBasePath: "/auth",
	},

	recipeList: [
		EmailPassword.init({
			override: {
				functions: (original) => ({
					...original,
					signUp: async (input) => {
						const res = await original.signUp(input);

						if (res.status === "OK") {
							// Explicitly send email only once during signup
							await EmailVerification.sendVerificationEmail({
								userContext: { manual: true },
							});
						}

						return res;
					},
				}),
			},
		}),

		Session.init(),

		EmailVerification.init({
			mode: "REQUIRED",
			override: {
				functions: (original) => ({
					...original,

					async sendVerificationEmail(input) {
						// Only send email if invoked manually during sign-up
						if (input.userContext?.manual === true) {
							return original.sendVerificationEmail(input);
						}

						// Otherwise, pretend like it's already sent
						return {
							status: "EMAIL_ALREADY_VERIFIED_ERROR", // or "OK", either prevents resend
							fetchResponse: new Response(null, { status: 200 }),
						};
					},
				}),
			},
		}),
		,
	],

	getRedirectionURL: async (context: any) => {
		if (context.action === "SUCCESS") {
			return "/dashboard";
		}
		if (context.action === "VERIFY_EMAIL_SUCCESS") {
			return "/dashboard";
		}
		return undefined;
	},
};

export const PreBuiltUIList = [EmailPasswordPreBuiltUI];

export const ComponentWrapper = ({ children }: { children: React.ReactNode }) =>
	children;

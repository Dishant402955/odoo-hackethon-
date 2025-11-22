"use client";

import { useEffect, useState } from "react";
import { SuperTokensWrapper } from "supertokens-auth-react";
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/ui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";

export default function VerifyEmail() {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		// ensure frontend is initialized
		if (!canHandleRoute) {
			setReady(true);
		} else {
			setReady(true);
		}
	}, []);

	if (!ready) return null; // prevents SSR crash

	if (canHandleRoute([EmailVerificationPreBuiltUI])) {
		return (
			<SuperTokensWrapper>
				{getRoutingComponent([EmailVerificationPreBuiltUI])}
			</SuperTokensWrapper>
		);
	}

	return <div>Invalid verification URL</div>;
}

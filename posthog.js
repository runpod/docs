// Consent-gated PostHog. Uses the same CookieScript geo script and "performance" category gate
// as runpod.io. Under Global Privacy Control, neither CookieScript nor PostHog loads.
(function () {
	if (navigator.globalPrivacyControl === true) return;

	// CookieScript reads this default before applying a visitor's choice, and the external
	// consent monitor checks for it. Pushed through gtag() because gtag.js ignores plain arrays.
	window.dataLayer = window.dataLayer || [];
	window.gtag =
		window.gtag ||
		function () {
			window.dataLayer.push(arguments);
		};
	window.gtag("consent", "default", {
		analytics_storage: "denied",
		ad_storage: "denied",
		ad_personalization: "denied",
		ad_user_data: "denied",
		functionality_storage: "denied",
		personalization_storage: "denied",
		security_storage: "granted",
		wait_for_update: 2000,
	});

	var initialized = false;

	function initPostHog() {
		if (initialized) return;
		initialized = true;

		!(function (t, e) {
			var o, n, p, r;
			e.__SV ||
				((window.posthog = e),
				(e._i = []),
				(e.init = function (i, s, a) {
					function g(t, e) {
						var o = e.split(".");
						2 == o.length && ((t = t[o[0]]), (e = o[1])),
							(t[e] = function () {
								t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
							});
					}
					((p = t.createElement("script")).type = "text/javascript"),
						(p.crossOrigin = "anonymous"),
						(p.async = !0),
						(p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js"),
						(r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
					var u = e;
					for (
						void 0 !== a ? (u = e[a] = []) : (a = "posthog"),
							u.people = u.people || [],
							u.toString = function (t) {
								var e = "posthog";
								return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e;
							},
							u.people.toString = function () {
								return u.toString(1) + ".people (stub)";
							},
							o =
								"init Ie Ts Ms Ee Es Rs capture Ge calculateEventProperties Os register register_once register_for_session unregister unregister_for_session js getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Ds Fs createPersonProfile Ls Ps opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing Cs debug I As getPageViewId captureTraceFeedback captureTraceMetric".split(
									" ",
								),
							n = 0;
						n < o.length;
						n++
					)
						g(u, o[n]);
					e._i.push([i, s, a]);
				}),
				(e.__SV = 1));
		})(document, window.posthog || []);
		posthog.init("phc_AYL8fNwqZy4Rf4bhpWpA2guti7HHK4gudCr7GtZSgH8j", {
			api_host: "https://us.i.posthog.com",
			defaults: "2025-05-24",
			person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
			// Without this, a reject stops capture but leaves PostHog's localStorage ID in place.
			opt_out_persistence_by_default: true,
		});
	}

	// Fired by the full banner (on accept, or on load for a returning visitor who accepted) and
	// by the geo wrapper for visitors outside the banner countries.
	window.addEventListener("CookieScriptCategory-performance", function () {
		initPostHog();
		// PostHog persists the opt-out from an earlier reject, which would outlast a later accept.
		// This event fires on every page load, so skip the default $opt_in event.
		window.posthog.opt_in_capturing({ captureEventName: false });
	});
	window.addEventListener("CookieScriptReject", function () {
		if (initialized) window.posthog.opt_out_capturing();
	});
	// Saving settings fires Accept rather than Reject, even when performance was unchecked.
	window.addEventListener("CookieScriptAccept", function (event) {
		var categories = (event.detail && event.detail.categories) || [];
		if (initialized && categories.indexOf("performance") === -1) window.posthog.opt_out_capturing();
	});

	var cookieScript = document.createElement("script");
	cookieScript.src =
		"https://geo.cookie-script.com/s/e7f4f0364e30c372db200f708bc7b28b.js?country=is-li-no-gb-gg-je-im-ch-ax-gf-gp-mq-re-yt-mf&region=eu";
	cookieScript.async = true;
	document.head.appendChild(cookieScript);
})();
